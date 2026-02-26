'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallbackMessage?: string;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    public static getDerivedStateFromError(error: Error): Partial<State> {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('[MISFITS ERROR]', error, errorInfo);
        this.setState({ errorInfo });

        // Sentry integration point — uncomment when configured:
        // import('@sentry/react').then(Sentry => Sentry.captureException(error));
    }

    private handleReload = () => {
        window.location.reload();
    };

    private handleGoHome = () => {
        window.location.href = '/';
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 z-[9999] bg-ink flex items-center justify-center p-8">
                    <div className="max-w-lg w-full text-center">
                        {/* Glitch header */}
                        <h1
                            className="font-syne font-extrabold text-rust uppercase leading-none mb-4"
                            style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', letterSpacing: '-0.03em' }}
                        >
                            SYSTEM_FAILURE
                        </h1>

                        <p className="font-mono text-silver/60 text-sm uppercase tracking-widest mb-8">
                            {this.props.fallbackMessage || 'SOMETHING BROKE IN THE BIN.'}
                        </p>

                        {/* Error details (dev only) */}
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="bg-charcoal border border-rust/30 p-4 mb-8 text-left overflow-auto max-h-48">
                                <p className="font-mono text-rust text-xs mb-2">{this.state.error.toString()}</p>
                                {this.state.errorInfo?.componentStack && (
                                    <pre className="font-mono text-silver/30 text-[9px] whitespace-pre-wrap">
                                        {this.state.errorInfo.componentStack}
                                    </pre>
                                )}
                            </div>
                        )}

                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={this.handleReload}
                                className="px-6 py-3 bg-acid text-ink font-syne font-bold uppercase tracking-widest hover:bg-rust hover:text-ash transition-colors duration-200 cursor-pointer"
                            >
                                REBOOT
                            </button>
                            <button
                                onClick={this.handleGoHome}
                                className="px-6 py-3 bg-charcoal text-silver/60 font-mono text-xs uppercase tracking-widest border border-ash/15 hover:border-acid/40 hover:text-acid transition-colors duration-200 cursor-pointer"
                            >
                                GO HOME
                            </button>
                        </div>

                        <p className="font-mono text-[8px] text-silver/20 uppercase tracking-widest mt-8">
                            ERROR CODE: {this.state.error?.name || 'UNKNOWN'} // MISFITS ST. V2.0
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
