import logo from '../../../assets/images/wurthy_logo.png';

export default function Logo() {
    return (
        <div data-discover="true">
            <div className="tw:dark:hidden tw:flex tw:flex-row tw:items-end">
                <span className="tw:uppercase tw:font-extrabold tw:text-3xl">Wurthy</span>
                <img className="tw:default-logo tw:h-[50px] tw:max-w-none" alt="Default Logo" src={logo} />
            </div>
            <div className="tw:hidden tw:dark:block tw:flex-row">
                <div className="tw:flex tw:flex-row  tw:items-end">
                    <span className="tw:uppercase tw:font-extrabold tw:text-3xl tw:text-white">Wurthy</span>
                    <img className="tw:default-logo tw:h-[50px] tw:max-w-none" alt="Default Dark Logo" src={logo} />
                </div>
            </div>
        </div>
    );
}