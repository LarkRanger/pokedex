import { MouseEvent, ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';

interface ModalProps {
    open: boolean;
    onClose: CallableFunction;
    children: ReactElement;
}

export function Modal({ open, children, onClose }: ModalProps) {
    if (!open) return null;
    const root = document.getElementById('root');
    return createPortal(<Overlay onClose={onClose}>{children}</Overlay>, root!);
}

interface OverlayProps {
    children: ReactElement;
    onClose: CallableFunction;
}
function Overlay({ children, onClose }: OverlayProps) {
    function onClickOverlay(e: MouseEvent<HTMLDivElement>) {
        const onComplete = () => onClose();
        gsap.to('.modal-overlay', { opacity: 0, duration: 0.05, onComplete });
    }

    function onClickContent(e: MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
    }

    useEffect(() => {
        gsap.timeline()
            .to('.modal-overlay', { backgroundColor: '#00000088', duration: 0.05, ease: 'none' })
            .fromTo('.modal-content', { scale: 0.9, duration: 0.1, ease: 'none' }, { opacity: 1 });
    }, []);

    return (
        <div
            className="modal-overlay w-screen h-screen fixed top-0 left-0 overflow-hidden flex items-center justify-center p-10 bg-black bg-opacity-0 transition-all"
            onClick={onClickOverlay}
        >
            <div className="modal-content opacity-0" onClick={onClickContent}>
                {children}
            </div>
        </div>
    );
}
