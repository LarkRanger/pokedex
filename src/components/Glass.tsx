import { HTMLAttributes } from 'react';
import cn from 'classnames';
import { Card } from './Card';

export function Glass({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <Card className={cn('backdrop-filter backdrop-blur-xl bg-opacity-60', className)} {...props}>
            {children}
        </Card>
    );
}
