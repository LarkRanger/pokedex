import { HTMLAttributes } from 'react';
import cn from 'classnames';

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('bg-white shadow-md px-2 border-double border-4 border-black', className)} {...props}>
            {children}
        </div>
    );
}
