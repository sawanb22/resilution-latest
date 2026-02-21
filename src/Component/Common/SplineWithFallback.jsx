import React, { Suspense, lazy } from 'react';

// Lazy-load Spline to avoid importing Three.js when WebGL is unavailable
const Spline = lazy(() => import('@splinetool/react-spline'));

/**
 * Detect if the browser supports WebGL by attempting to get a WebGL context
 * from an offscreen canvas. This avoids the fatal Three.js crash.
 */
function isWebGLAvailable() {
    try {
        const canvas = document.createElement('canvas');
        const gl =
            canvas.getContext('webgl2') ||
            canvas.getContext('webgl') ||
            canvas.getContext('experimental-webgl');
        return gl instanceof WebGLRenderingContext || gl instanceof WebGL2RenderingContext;
    } catch {
        return false;
    }
}

// Cache the result so we don't re-check on every render
const webGLSupported = typeof window !== 'undefined' ? isWebGLAvailable() : false;

/**
 * Error Boundary that catches runtime errors from the Spline/Three.js renderer
 * and shows a fallback instead of crashing the entire React tree.
 */
class SplineErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.warn(
            '[SplineWithFallback] 3D render failed — showing fallback.',
            error,
            info
        );
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || null;
        }
        return this.props.children;
    }
}

/**
 * A loading placeholder shown while the Spline component is lazy-loaded.
 */
function LoadingPlaceholder({ style, className }) {
    return (
        <div
            className={className}
            style={{
                ...style,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.15,
            }}
        />
    );
}

/**
 * Fallback UI displayed when WebGL is unavailable or when Spline crashes.
 * If a fallbackImage is provided, it renders the image; otherwise it renders
 * a transparent placeholder so the surrounding layout isn't affected.
 */
function Fallback({ style, className, fallbackImage, fallbackAlt }) {
    if (fallbackImage) {
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <img
                    src={fallbackImage}
                    alt={fallbackAlt || '3D content unavailable'}
                    style={{
                        maxWidth: '60%',
                        maxHeight: '60%',
                        objectFit: 'contain',
                        opacity: 0.7,
                    }}
                />
            </div>
        );
    }

    // Transparent placeholder — preserves layout without rendering anything visible
    return (
        <div
            className={className}
            style={{
                ...style,
                opacity: 0,
                pointerEvents: 'none',
            }}
        />
    );
}

/**
 * Safe wrapper around @splinetool/react-spline.
 *
 * - Checks WebGL availability before rendering
 * - Wraps <Spline> in an Error Boundary so crashes are isolated
 * - Shows a graceful fallback instead of killing the entire app
 *
 * Props:
 *   scene         – Spline scene URL (required)
 *   style         – inline styles passed to Spline / fallback
 *   className     – className passed to the container
 *   fallbackImage – optional static image to show when 3D is unavailable
 *   fallbackAlt   – alt text for the fallback image
 *   ...rest       – any additional props forwarded to <Spline>
 */
export function SplineWithFallback({
    scene,
    style,
    className,
    fallbackImage,
    fallbackAlt,
    ...rest
}) {
    const fallbackElement = (
        <Fallback
            style={style}
            className={className}
            fallbackImage={fallbackImage}
            fallbackAlt={fallbackAlt}
        />
    );

    // If WebGL is not available, skip rendering Spline entirely
    if (!webGLSupported) {
        return fallbackElement;
    }

    return (
        <SplineErrorBoundary fallback={fallbackElement}>
            <Suspense
                fallback={
                    <LoadingPlaceholder style={style} className={className} />
                }
            >
                <Spline scene={scene} style={style} {...rest} />
            </Suspense>
        </SplineErrorBoundary>
    );
}

export default SplineWithFallback;
