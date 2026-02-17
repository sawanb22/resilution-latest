// EdenChatWidget.tsx - Main widget component with Socket.IO middleware integration
// Built from scratch following middleware specification
'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { widgetTheme } from './theme';
import { ChatLauncher } from './ChatLauncher';
import { ChatHeader } from './ChatHeader';
import { ChatMessage, TypingIndicator, Message } from './ChatMessage';
import { ContactForm } from './ContactForm';
import { ChatInput } from './ChatInput';
import { getVisitorId, getSessionId, setSessionId as saveSessionId, clearSessionId, isFormDone, markFormDone } from './storage';

interface EdenChatWidgetProps {
  middlewareUrl: string;        // Middleware backend URL
  assetsPath?: string;          // Path to assets (default: '/chat-widget')
  initialOpen?: boolean;        // Start with widget open (default: false)
  heartbeatInterval?: number;   // Heartbeat frequency in ms (default: 25000)
}

export default function EdenChatWidget({
  middlewareUrl,
  assetsPath = '/chat-widget',
  initialOpen = false,
  heartbeatInterval = 25000,
}: EdenChatWidgetProps) {
  // UI state
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(true);
  
  // Connection state
  const [isConnected, setIsConnected] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  
  // Refs
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const heartbeatTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingFormDataRef = useRef<{ name: string; email: string; role: string } | null>(null);
  
  // Detect mobile
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    try {
      const ua = navigator.userAgent || '';
      const mobileUa = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      const narrow = window.matchMedia('(max-width: 640px)').matches;
      return mobileUa || narrow;
    } catch {
      return false;
    }
  }, []);

  // Force fullscreen on mobile
  useEffect(() => {
    if (isOpen && isMobile) setIsFullscreen(true);
  }, [isOpen, isMobile]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Socket.IO connection and event handlers
  useEffect(() => {
    const visitorId = getVisitorId();
    const existingSessionId = getSessionId();
    
    console.log('[EdenWidget] Connecting to middleware...', {
      middlewareUrl,
      visitorId,
      existingSessionId,
    });

    // Create socket connection
    const socket = io(middlewareUrl, {
      auth: {
        visitorId,
        sessionId: existingSessionId || undefined,
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    // Event handler: connect
    const onConnect = () => {
      console.log('[EdenWidget] ✅ Connected to middleware');
      setIsConnected(true);
      startHeartbeat();
    };

    // Event handler: disconnect
    const onDisconnect = (reason: string) => {
      console.log('[EdenWidget] 🔌 Disconnected:', reason);
      setIsConnected(false);
      setIsTyping(false);
      stopHeartbeat();
    };

    // Event handler: connect_error
    const onConnectError = (err: any) => {
      console.error('[EdenWidget] ❌ Connection error:', err.message);
      setIsConnected(false);
    };

    // Event handler: session
    const onSession = (data: { sessionId: string }) => {
      console.log('[EdenWidget] 📋 Session received:', data.sessionId);
      setSessionId(data.sessionId);
      saveSessionId(data.sessionId);
      
      // If form was pending submission, send it now
      if (pendingFormDataRef.current && !isFormDone(data.sessionId)) {
        const { name, email, role } = pendingFormDataRef.current;
        sendFormMessage(name, email, role, data.sessionId);
        pendingFormDataRef.current = null;
      }
    };

    // Event handler: history
    const onHistory = (msgs: any[]) => {
      console.log('[EdenWidget] 📜 History received:', msgs?.length || 0, 'messages');
      
      if (msgs && Array.isArray(msgs)) {
        const formattedMessages: Message[] = msgs.map((msg) => ({
          id: msg.id || `msg-${Date.now()}-${Math.random()}`,
          content: msg.content || '',
          sender: msg.sender === 'USER' ? 'USER' : 'BOT',
          createdAt: msg.createdAt || new Date().toISOString(),
        }));
        
        setMessages(formattedMessages);
        
        // Show contact form only if no history and form not done for this session
        const currentSessionId = getSessionId();
        const hasHistory = formattedMessages.length > 0;
        const formCompleted = currentSessionId ? isFormDone(currentSessionId) : false;
        setShowContactForm(!hasHistory && !formCompleted);
      }
    };

    // Event handler: message
    const onMessage = (msg: any) => {
      console.log('[EdenWidget] 💬 Message received:', msg.sender, msg.content?.substring(0, 50));
      
      const newMessage: Message = {
        id: msg.id || `msg-${Date.now()}-${Math.random()}`,
        content: msg.content || '',
        sender: msg.sender === 'USER' ? 'USER' : 'BOT',
        createdAt: msg.createdAt || new Date().toISOString(),
      };
      
      // Show USER echo (for multi-device sync) and BOT responses
      setMessages(prev => [...prev, newMessage]);
      
      // Hide typing indicator when BOT responds
      if (msg.sender === 'BOT') {
        setIsTyping(false);
      }
    };

    // Event handler: status
    const onStatus = (data: { status: string }) => {
      console.log('[EdenWidget] 📊 Status update:', data.status);
      
      if (data.status === 'CLOSED') {
        handleSessionClosed();
      }
    };

    // Event handler: sessionClosed
    const onSessionClosed = (data: { sessionId: string }) => {
      console.log('[EdenWidget] 🔒 Session closed:', data.sessionId);
      handleSessionClosed();
    };

    // Event handler: error
    const onError = (err: any) => {
      console.error('[EdenWidget] ❌ Error from middleware:', err.message || err);
      
      // Show error message in chat
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        content: '❌ Something went wrong. Please try again.',
        sender: 'BOT',
        createdAt: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMsg]);
      setIsTyping(false);
    };

    // Register all event listeners
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);
    socket.on('session', onSession);
    socket.on('history', onHistory);
    socket.on('message', onMessage);
    socket.on('status', onStatus);
    socket.on('sessionClosed', onSessionClosed);
    socket.on('error', onError);

    // Cleanup function
    return () => {
      console.log('[EdenWidget] Cleaning up socket connection...');
      stopHeartbeat();
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
      socket.off('session', onSession);
      socket.off('history', onHistory);
      socket.off('message', onMessage);
      socket.off('status', onStatus);
      socket.off('sessionClosed', onSessionClosed);
      socket.off('error', onError);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [middlewareUrl]); // Only reconnect if URL changes

  // Heartbeat to keep session alive
  const startHeartbeat = () => {
    if (heartbeatTimerRef.current) return;
    
    console.log('[EdenWidget] 💓 Starting heartbeat every', heartbeatInterval, 'ms');
    
    heartbeatTimerRef.current = setInterval(() => {
      const sid = getSessionId();
      if (sid && socketRef.current?.connected) {
        socketRef.current.emit('heartbeat', { sessionId: sid });
        console.log('[EdenWidget] 💓 Heartbeat sent');
      }
    }, heartbeatInterval);
  };

  const stopHeartbeat = () => {
    if (heartbeatTimerRef.current) {
      clearInterval(heartbeatTimerRef.current);
      heartbeatTimerRef.current = null;
      console.log('[EdenWidget] 💓 Heartbeat stopped');
    }
  };

  // Handle session closed (from backend)
  const handleSessionClosed = () => {
    clearSessionId();
    setMessages([]);
    setShowContactForm(true);
    setIsTyping(false);
    setInputValue('');
    setSessionId('');
    
    // Reconnect to get new session
    if (socketRef.current) {
      const visitorId = getVisitorId();
      socketRef.current.auth = { visitorId };
      socketRef.current.connect();
      console.log('[EdenWidget] 🔄 Reconnecting for new session...');
    }
  };

  // Helper: Wait for socket connection
  const waitForConnection = (timeoutMs: number): Promise<boolean> => {
    return new Promise((resolve) => {
      if (socketRef.current?.connected) {
        console.log('[EdenWidget] ✅ Socket already connected');
        resolve(true);
        return;
      }

      let timeout: NodeJS.Timeout;
      let checkInterval: NodeJS.Timeout;

      timeout = setTimeout(() => {
        clearInterval(checkInterval);
        console.error('[EdenWidget] ❌ Connection timeout');
        resolve(false);
      }, timeoutMs);

      checkInterval = setInterval(() => {
        if (socketRef.current?.connected) {
          clearTimeout(timeout);
          clearInterval(checkInterval);
          console.log('[EdenWidget] ✅ Socket connected!');
          resolve(true);
        }
      }, 200);
    });
  };

  // Helper: Wait for session event from backend
  const waitForSession = (timeoutMs: number): Promise<string | null> => {
    return new Promise((resolve) => {
      const existingSession = getSessionId();
      if (existingSession) {
        console.log('[EdenWidget] ✅ Session already exists:', existingSession);
        resolve(existingSession);
        return;
      }

      let timeout: NodeJS.Timeout;
      let checkInterval: NodeJS.Timeout;

      timeout = setTimeout(() => {
        clearInterval(checkInterval);
        console.error('[EdenWidget] ❌ Session timeout after', timeoutMs, 'ms');
        resolve(null);
      }, timeoutMs);

      checkInterval = setInterval(() => {
        const sid = getSessionId();
        if (sid) {
          clearTimeout(timeout);
          clearInterval(checkInterval);
          console.log('[EdenWidget] ✅ Session received:', sid);
          resolve(sid);
        }
      }, 200);
    });
  };

  // Send form submission as first message
  const sendFormMessage = (name: string, email: string, role: string, sid: string) => {
    const content = `Name: ${name}, Email: ${email}, Role: ${role}`;
    
    console.log('[EdenWidget] 📤 Sending form message:', content);
    
    // Mark form as done for this session
    markFormDone(sid);
    setShowContactForm(false);
    setIsFormSubmitting(false);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Emit message to middleware
    socketRef.current?.emit('message', {
      sessionId: sid,
      content,
    });
  };

  // Contact form submit handler with validation
  const handleFormSubmit = async (data: { name: string; email: string; role: string }) => {
    console.log('[EdenWidget] 📝 Form submit triggered:', data);

    // Validation 1: Check if socket exists
    if (!socketRef.current) {
      console.error('[EdenWidget] ❌ No socket available');
      alert('Connection error. Please refresh the page.');
      return;
    }

    // Validation 2: Check if socket is connected
    if (!socketRef.current.connected) {
      console.warn('[EdenWidget] ⚠️ Socket not connected, waiting...');
      setIsFormSubmitting(true);

      const connected = await waitForConnection(5000);
      
      if (!connected) {
        console.error('[EdenWidget] ❌ Failed to establish connection');
        setIsFormSubmitting(false);
        alert('Unable to connect. Please refresh the page and try again.');
        return;
      }
    }

    // Validation 3: Check if we have a sessionId
    let sessionId = getSessionId();
    
    if (!sessionId) {
      console.warn('[EdenWidget] ⚠️ No session yet, waiting for backend...');
      setIsFormSubmitting(true);

      sessionId = await waitForSession(10000);
      
      if (!sessionId) {
        console.error('[EdenWidget] ❌ Session timeout after 10s');
        setIsFormSubmitting(false);
        alert('Session creation failed. Please refresh the page and try again.');
        return;
      }
    }

    // All validations passed - submit form
    console.log('[EdenWidget] ✅ All checks passed, submitting form with session:', sessionId);
    setIsFormSubmitting(true);
    sendFormMessage(data.name, data.email, data.role, sessionId);
  };

  // Send regular message
  const handleSendMessage = () => {
    const content = inputValue.trim();
    if (!content || !isConnected || isTyping) return;
    
    const sid = getSessionId();
    if (!sid) {
      console.error('[EdenWidget] No session ID available');
      return;
    }
    
    console.log('[EdenWidget] 📤 Sending message:', content);
    
    setInputValue('');
    setIsTyping(true);
    
    // Emit message to middleware
    socketRef.current?.emit('message', {
      sessionId: sid,
      content,
    });
  };

  // End chat session with async confirmation
  const handleEndChat = async () => {
    const sid = getSessionId();
    if (!sid || !socketRef.current) {
      console.warn('[EdenWidget] ⚠️ Cannot end chat: No socket or session');
      return;
    }
    
    console.log('[EdenWidget] 🔚 Ending chat session:', sid);
    
    try {
      // Step 1: Tell backend to close session
      socketRef.current.emit('end_chat', { sessionId: sid });
      
      // Step 2: Wait for backend confirmation (max 3 seconds)
      await new Promise<void>((resolve) => {
        const timeout = setTimeout(() => {
          console.warn('[EdenWidget] ⚠️ Session close confirmation timeout');
          resolve();
        }, 3000);

        const onSessionClosed = (data: { sessionId: string }) => {
          console.log('[EdenWidget] ✅ Backend confirmed session closed:', data.sessionId);
          clearTimeout(timeout);
          socketRef.current?.off('sessionClosed', onSessionClosed);
          resolve();
        };

        socketRef.current?.once('sessionClosed', onSessionClosed);
      });

      console.log('[EdenWidget] ✅ Session close process complete');

      // Step 3: Clean up local state
      clearSessionId();
      setMessages([]);
      setShowContactForm(true);
      setIsFormSubmitting(false);
      setIsTyping(false);
      setInputValue('');
      setSessionId('');

      // Step 4: Disconnect with buffer time
      if (socketRef.current) {
        socketRef.current.disconnect();
        
        // Critical 500ms wait for backend cleanup
        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log('[EdenWidget] 🔄 Reconnecting for new session...');
        socketRef.current.connect();
      }

      // Step 5: Close widget
      setIsOpen(false);
      setIsFullscreen(false);

    } catch (error) {
      console.error('[EdenWidget] ❌ Error ending chat:', error);
      
      // Force cleanup
      clearSessionId();
      setMessages([]);
      setShowContactForm(true);
      setIsOpen(false);
      setIsFullscreen(false);
    }
  };

  // New chat (reset everything) with async confirmation
  const handleNewChat = async () => {
    console.log('[EdenWidget] 🆕 Starting new chat');
    
    const sid = getSessionId();
    if (!sid || !socketRef.current) {
      handleSessionClosed();
      return;
    }
    
    try {
      // Emit end_chat
      socketRef.current.emit('end_chat', { sessionId: sid });
      
      // Wait for confirmation
      await new Promise<void>((resolve) => {
        const timeout = setTimeout(() => {
          console.warn('[EdenWidget] ⚠️ Session close timeout');
          resolve();
        }, 3000);

        const onSessionClosed = (data: { sessionId: string }) => {
          console.log('[EdenWidget] ✅ Session closed confirmed');
          clearTimeout(timeout);
          socketRef.current?.off('sessionClosed', onSessionClosed);
          resolve();
        };

        socketRef.current?.once('sessionClosed', onSessionClosed);
      });

      // Clear session
      clearSessionId();
      
      // Reset UI
      setMessages([]);
      setShowContactForm(true);
      setIsFormSubmitting(false);
      setIsTyping(false);
      setInputValue('');
      setSessionId('');
      
      // Disconnect with buffer
      if (socketRef.current) {
        socketRef.current.disconnect();
        await new Promise(resolve => setTimeout(resolve, 500));
        socketRef.current.connect();
      }
      
      console.log('[EdenWidget] ✅ New chat ready');
      
    } catch (error) {
      console.error('[EdenWidget] ❌ New chat error:', error);
      handleSessionClosed();
    }
  };

  // Render
  return (
    <>
      {/* Chat Launcher */}
      <ChatLauncher
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        assetsPath={assetsPath}
      />

      {/* Backdrop for fullscreen */}
      {isOpen && isFullscreen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: widgetTheme.colors.background.overlay,
            zIndex: widgetTheme.zIndex.backdrop,
          }}
          onClick={() => setIsFullscreen(false)}
        />
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            ...(isFullscreen
              ? {
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: widgetTheme.spacing.lg,
                  zIndex: widgetTheme.zIndex.window,
                }
              : {
                  bottom: '100px',
                  right: widgetTheme.layout.launcher.right,
                  width: widgetTheme.layout.window.width,
                  maxHeight: widgetTheme.layout.window.maxHeight,
                  zIndex: widgetTheme.zIndex.window,
                }),
          }}
        >
          <div
            style={{
              width: '100%',
              ...(isFullscreen
                ? {
                    maxWidth: widgetTheme.layout.fullscreen.maxWidth,
                    height: widgetTheme.layout.fullscreen.height,
                  }
                : {
                    height: widgetTheme.layout.window.height,
                  }),
              backgroundColor: widgetTheme.colors.background.main,
              borderRadius: widgetTheme.layout.window.borderRadius,
              boxShadow: widgetTheme.shadows.xxl,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Header */}
            <ChatHeader
              isConnected={isConnected}
              isMobile={isMobile}
              isFullscreen={isFullscreen}
              onNewChat={handleNewChat}
              onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
              assetsPath={assetsPath}
            />

            {/* Messages Area */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: widgetTheme.spacing.lg,
                backgroundColor: widgetTheme.colors.background.secondary,
              }}
            >
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Contact Form Overlay */}
            {showContactForm && (
              <ContactForm
                onSubmit={handleFormSubmit}
                isSubmitting={isFormSubmitting}
              />
            )}

            {/* Input Footer */}
            {!showContactForm && (
              <ChatInput
                value={inputValue}
                onChange={setInputValue}
                onSend={handleSendMessage}
                onEndChat={handleEndChat}
                disabled={!isConnected}
                isSending={isTyping}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
