// ContactForm.tsx - Onboarding contact form overlay
import React, { useState, useMemo } from 'react';
import { widgetTheme } from './theme';

type Role = 'Investor' | 'Business Owner' | 'VC' | 'Just Curious';

interface ContactFormProps {
  onSubmit: (data: { name: string; email: string; role: Role }) => void;
  isSubmitting: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, isSubmitting }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role | ''>('');

  const emailValid = useMemo(() => {
    const trimmed = email.trim();
    return trimmed.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  }, [email]);

  const formValid = name.trim().length > 0 && email.trim().length > 0 && emailValid && role !== '';

  const handleSubmit = () => {
    if (formValid && !isSubmitting) {
      onSubmit({ 
        name: name.trim(), 
        email: email.trim(), 
        role: role as Role 
      });
    }
  };

  const roles: Role[] = ['Investor', 'Business Owner', 'VC', 'Just Curious'];

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: widgetTheme.colors.background.overlay,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: widgetTheme.spacing.lg,
      zIndex: widgetTheme.zIndex.overlay,
    }}>
      <div style={{
        backgroundColor: widgetTheme.colors.background.main,
        borderRadius: widgetTheme.borderRadius.xl,
        padding: widgetTheme.spacing.xxl,
        maxWidth: '400px',
        width: '100%',
        boxShadow: widgetTheme.shadows.xxl,
      }}>
        {/* Title */}
        <h2 style={{
          fontSize: widgetTheme.typography.fontSize.lg,
          fontWeight: widgetTheme.typography.fontWeight.semibold,
          color: widgetTheme.colors.text.primary,
          marginBottom: widgetTheme.spacing.sm,
          textAlign: 'center',
        }}>
          Hi! 👋 Welcome to Resilution
        </h2>
        
        <p style={{
          fontSize: widgetTheme.typography.fontSize.sm,
          color: widgetTheme.colors.text.secondary,
          marginBottom: widgetTheme.spacing.xl,
          textAlign: 'center',
        }}>
          I'm Eden, your guide here. Before we get started, could you share:
        </p>

        {/* Name input */}
        <label style={{
          display: 'block',
          fontSize: widgetTheme.typography.fontSize.sm,
          fontWeight: widgetTheme.typography.fontWeight.medium,
          color: widgetTheme.colors.text.primary,
          marginBottom: widgetTheme.spacing.sm,
        }}>
          Your first name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First name"
          style={{
            width: '100%',
            padding: widgetTheme.spacing.md,
            border: `2px solid ${widgetTheme.colors.border.default}`,
            backgroundColor: '#2a3238',
            color: '#ffffff',
            WebkitTextFillColor: '#ffffff',
            borderRadius: widgetTheme.borderRadius.md,
            fontSize: widgetTheme.typography.fontSize.sm,
            marginBottom: widgetTheme.spacing.lg,
            outline: 'none',
            transition: `all ${widgetTheme.animation.fast}`,
          } as React.CSSProperties}
          className="eden-input"
          onFocus={(e) => {
            e.currentTarget.style.borderColor = widgetTheme.colors.primary;
            e.currentTarget.style.borderWidth = '2px';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = widgetTheme.colors.border.default;
          }}
        />

        {/* Email input */}
        <label style={{
          display: 'block',
          fontSize: widgetTheme.typography.fontSize.sm,
          fontWeight: widgetTheme.typography.fontWeight.medium,
          color: widgetTheme.colors.text.primary,
          marginBottom: widgetTheme.spacing.sm,
        }}>
          Your email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{
            width: '100%',
            padding: widgetTheme.spacing.md,
            border: `2px solid ${!emailValid ? widgetTheme.colors.border.error : widgetTheme.colors.border.default}`,
            backgroundColor: '#2a3238',
            color: '#ffffff',
            WebkitTextFillColor: '#ffffff',
            borderRadius: widgetTheme.borderRadius.md,
            fontSize: widgetTheme.typography.fontSize.sm,
            marginBottom: widgetTheme.spacing.lg,
            outline: 'none',
            transition: `all ${widgetTheme.animation.fast}`,
          } as React.CSSProperties}
          className="eden-input"
          onFocus={(e) => {
            if (emailValid) {
              e.currentTarget.style.borderColor = widgetTheme.colors.primary;
              e.currentTarget.style.borderWidth = '2px';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = !emailValid 
              ? widgetTheme.colors.border.error 
              : widgetTheme.colors.border.default;
          }}
        />

        {/* Role selector */}
        <label style={{
          display: 'block',
          fontSize: widgetTheme.typography.fontSize.sm,
          fontWeight: widgetTheme.typography.fontWeight.medium,
          color: widgetTheme.colors.text.primary,
          marginBottom: widgetTheme.spacing.sm,
        }}>
          Which best describes you?
        </label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: widgetTheme.spacing.sm,
          marginBottom: widgetTheme.spacing.xl,
        }}>
          {roles.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              style={{
                  padding: widgetTheme.spacing.md,
                  border: `2px solid ${role === r ? widgetTheme.colors.primary : widgetTheme.colors.border.accent}`,
                  borderRadius: widgetTheme.borderRadius.md,
                  backgroundColor: role === r ? `${widgetTheme.colors.primary}10` : widgetTheme.colors.background.main,
                  color: role === r ? widgetTheme.colors.primary : widgetTheme.colors.text.primary,
                  fontSize: widgetTheme.typography.fontSize.sm,
                  fontWeight: widgetTheme.typography.fontWeight.medium,
                  cursor: 'pointer',
                  transition: `all ${widgetTheme.animation.fast}`,
                }}
              onMouseEnter={(e) => {
                if (role !== r) {
                  e.currentTarget.style.borderColor = widgetTheme.colors.primary;
                  e.currentTarget.style.backgroundColor = `${widgetTheme.colors.primary}05`;
                }
              }}
              onMouseLeave={(e) => {
                if (role !== r) {
                  e.currentTarget.style.borderColor = widgetTheme.colors.border.default;
                  e.currentTarget.style.backgroundColor = widgetTheme.colors.background.main;
                }
              }}
            >
              {r}
            </button>
          ))}
        </div>

        <p style={{
          fontSize: widgetTheme.typography.fontSize.sm,
          color: widgetTheme.colors.text.secondary,
          marginBottom: widgetTheme.spacing.lg,
          textAlign: 'center',
        }}>
          Thanks! Let's get you started. ✨
        </p>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!formValid || isSubmitting}
          style={{
            width: '100%',
            padding: widgetTheme.spacing.md,
            backgroundColor: formValid && !isSubmitting ? widgetTheme.colors.primary : widgetTheme.colors.border.accent,
            color: widgetTheme.colors.text.inverse,
            border: formValid && !isSubmitting ? `2px solid ${widgetTheme.colors.primary}` : `1px solid ${widgetTheme.colors.border.default}`,
            borderRadius: widgetTheme.borderRadius.md,
            fontSize: widgetTheme.typography.fontSize.base,
            fontWeight: widgetTheme.typography.fontWeight.semibold,
            cursor: formValid && !isSubmitting ? 'pointer' : 'not-allowed',
            transition: `background-color ${widgetTheme.animation.fast}`,
          }}
          onMouseEnter={(e) => {
            if (formValid && !isSubmitting) {
              e.currentTarget.style.backgroundColor = widgetTheme.colors.primaryHover;
              e.currentTarget.style.borderColor = widgetTheme.colors.primary;
            }
          }}
          onMouseLeave={(e) => {
            if (formValid && !isSubmitting) {
              e.currentTarget.style.backgroundColor = widgetTheme.colors.primary;
              e.currentTarget.style.borderColor = widgetTheme.colors.primary;
            }
          }}
        >
          {isSubmitting ? 'Please wait...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};
