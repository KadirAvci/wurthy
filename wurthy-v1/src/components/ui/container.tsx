import type { ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
    return (
        <div className={'tw:w-full tw:mx-auto tw:px-4 tw:lg:px-6 tw:max-w-[1320px]'}>
            <div className={'tw:flex tw:flex-col tw:items-stretch tw:gap-5 tw:lg:gap-7.5'}>
                {children}
            </div>
        </div>
    );
}

export default Container;