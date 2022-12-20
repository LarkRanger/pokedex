import { MouseEventHandler, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

/**
 * Largely adapted from https://www.thisdot.co/blog/creating-custom-scrollbars-with-react
 */
export function Scroll(props: PropsWithChildren) {
    const contentRef = useRef<HTMLDivElement>(null);
    const scrollTrackRef = useRef<HTMLDivElement>(null);
    const scrollThumbRef = useRef<HTMLDivElement>(null);
    const observer = useRef<ResizeObserver | null>(null);
    const [thumbHeight, setThumbHeight] = useState(DEFAULT_SIZE);
    const [scrollStartPosition, setScrollStartPosition] = useState<number | null>(null);
    const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    function handleResize(ref: HTMLDivElement, trackSize: number) {
        const { clientHeight, scrollHeight } = ref;
        setThumbHeight(Math.max((clientHeight / scrollHeight) * trackSize, DEFAULT_SIZE));
    }

    const handleThumbPosition = useCallback(() => {
        if (!contentRef.current || !scrollTrackRef.current || !scrollThumbRef.current) return;
        const { scrollTop: contentTop, scrollHeight: contentHeight } = contentRef.current;
        const { clientHeight: trackHeight } = scrollTrackRef.current;
        const relativeTopTop = (+contentTop / +contentHeight) * trackHeight;
        const newTop = Math.min(relativeTopTop, trackHeight - thumbHeight);
        scrollThumbRef.current.style.top = `${newTop}px`;
    }, [contentRef.current, scrollTrackRef.current, scrollThumbRef.current]);

    const handleTrackClick: MouseEventHandler<HTMLDivElement> = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();

            const { current: trackCurrent } = scrollTrackRef;
            const { current: contentCurrent } = contentRef;
            if (!trackCurrent || !contentCurrent) return;

            const { clientY } = e;
            const target = e.target as HTMLDivElement;
            const rect = target.getBoundingClientRect();
            const trackTop = rect.top;
            // we want the middle of the thumb to jump to where we clicked, so we subtract half the thumb's height to offset the position
            const thumbOffset = -(thumbHeight / 2);
            // find the ratio of the new position to the total content length using the thumb and track values...
            const clickRatio = (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;
            // ...so that you can compute where the content should scroll to.
            const scrollAmount = Math.floor(clickRatio * contentCurrent.scrollHeight);

            contentCurrent.scrollTo({
                top: scrollAmount,
                behavior: 'smooth',
            });
        },
        [thumbHeight]
    );

    const handleThumbMousedown: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setScrollStartPosition(e.clientY);
        if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);
        setIsDragging(true);
    }, []);

    const handleThumbMouseup: MouseEventHandler<HTMLDivElement> = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isDragging) setIsDragging(false);
        },
        [isDragging]
    );

    const handleThumbMousemove: MouseEventHandler<HTMLDivElement> = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isDragging || !contentRef.current || scrollStartPosition === null) return;
            const { scrollHeight: contentScrollHeight, offsetHeight: contentOffsetHeight } = contentRef.current;

            // Subtract the current mouse y position from where you started to get the pixel difference in mouse position. Multiply by ratio of visible content height to thumb height to scale up the difference for content scrolling.
            const deltaY = (e.clientY - scrollStartPosition) * (contentOffsetHeight / thumbHeight);
            const newScrollTop = Math.min(initialScrollTop + deltaY, contentScrollHeight - contentOffsetHeight);

            contentRef.current.scrollTop = newScrollTop;
        },
        [isDragging, scrollStartPosition, thumbHeight]
    );

    useEffect(() => {
        if (!contentRef.current || !scrollTrackRef.current) return;
        const ref = contentRef.current;
        const { clientHeight: trackSize } = scrollTrackRef.current;
        observer.current = new ResizeObserver(() => handleResize(ref, trackSize));
        observer.current.observe(ref);
        return () => {
            observer.current?.unobserve(ref);
        };
    }, [contentRef.current, scrollTrackRef.current]);

    return (
        <div className="w-full h-full relative">
            <div ref={contentRef} className="w-full h-full overflow-auto" onScroll={handleThumbPosition}>
                {props.children}
            </div>
            <div className="h-full w-4 absolute right-0 top-0">
                <div
                    ref={scrollTrackRef}
                    className={cn('w-full absolute bottom-0 top-0', {
                        'cursor-pointer': !isDragging,
                        'cursor-grabbing': isDragging,
                    })}
                    onClick={handleTrackClick}
                />
                <div
                    ref={scrollThumbRef}
                    style={{ height: `${thumbHeight}px` }}
                    className={cn('w-full absolute bg-gray-600 rounded-full', {
                        'cursor-grab': !isDragging,
                        'cursor-grabbing': isDragging,
                    })}
                    onMouseDown={handleThumbMousedown}
                    onMouseUp={handleThumbMouseup}
                    onMouseMove={handleThumbMousemove}
                />
            </div>
        </div>
    );
}

const DEFAULT_SIZE = 20;
