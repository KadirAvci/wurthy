import bgBanner from '@/assets/images/bg-1.png'
import * as React from "react";

export type BannerProps = {
    maimImage: string,
    title: string,
    icon: React.ReactNode,
    children: React.ReactNode,
}

function Banner({ maimImage, title, icon, children, ...props }: BannerProps & React.ComponentProps<"div">) {
    const className = { ...props }

    return (
        <div className="tw:bg-center tw:bg-cover tw:bg-no-repeat tw:hero-bg tw:mt-1 tw:mb-5" style={{ backgroundImage: `url(${bgBanner})` }}>
            <div data-slot="container" className="tw:w-full tw:mx-auto tw:px-4 tw:lg:px-6 tw:max-w-[1320px]">
                <div className="tw:flex tw:flex-col tw:items-center tw:gap-2 tw:lg:gap-3.5 tw:py-4 tw:lg:pt-5 tw:lg:pb-10">
                    <div className={`tw:flex tw:items-center tw:justify-center tw:rounded-full tw:border-2 tw:border-green-600 tw:size-[100px] tw:shrink-0 ${className}`}>
                        <img className="tw:rounded-full" alt="image" src={maimImage} />
                    </div>
                    <div className="tw:flex tw:items-center tw:gap-1.5">
                        <div className="tw:text-lg tw:leading-5 tw:font-semibold tw:text-mono">{title}</div>
                        {icon}
                    </div>
                    <div className="tw:flex tw:flex-wrap tw:justify-center tw:gap-1 tw:lg:gap-4.5 tw:text-sm">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;