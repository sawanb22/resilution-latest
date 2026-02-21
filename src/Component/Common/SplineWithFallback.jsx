import React from 'react';
import Spline from '@splinetool/react-spline';

/**
 * Detect if the browser supports WebGL by attempting to get a WebGL context
 * from an offscreen canvas.
 */
function isWebGLAvailable() {
    try {
        const canvas = document.createElement('canvas');
        // Simple, robust check: just ensure getContext doesn't return null
        return !!(window.WebGLRenderingContext &&
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
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
 * Safe wrapper around @splinetool/react-spline.
 *
 * - Checks WebGL availability before rendering (robust cross-browser)
 * - Wraps <Spline> in an Error Boundary so crashes are isolated
 * - Passes ALL props down to <Spline> safely to preserve styling/dimensions
 */
export function SplineWithFallback(props) {
    const { fallbackImage, fallbackAlt, ...splineProps } = props;

    const fallbackElement = fallbackImage ? (
        <div
            className={props.className}
            style={{
                ...props.style,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
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
    ) : (
        <div
            className={props.className}
            style={{
                ...props.style,
                opacity: 0,
                pointerEvents: 'none'
            }}
        />
    );

    // If WebGL is not available, skip rendering Spline entirely
    if (!webGLSupported) {
        return fallbackElement;
    }

    return (
        <SplineErrorBoundary fallback={fallbackElement}>
            <Spline {...splineProps} />
        </SplineErrorBoundary>
    );
}

export default SplineWithFallback;
