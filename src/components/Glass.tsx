import { HTMLAttributes } from 'react';
import cn from 'classnames';

export function Glass({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('p-3 rounded-lg shadow-md backdrop-filter backdrop-blur-xl bg-opacity-60', className)}
            {...props}
        >
            {children}
        </div>
    );
}
