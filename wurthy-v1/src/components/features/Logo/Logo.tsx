import logo from '../../../assets/images/wurthy_logo.png';

export default function Logo() {
    return (
        <div data-discover="true">
            <div className="dark:hidden flex flex-row items-end">
                <span className="uppercase font-extrabold text-3xl">Wurthy</span>
                <img className="default-logo h-[50px] max-w-none" alt="Default Logo" src={logo} />
            </div>
            <div className="hidden dark:block flex-row">
                <div className="flex flex-row  items-end">
                    <span className="uppercase font-extrabold text-3xl text-white">Wurthy</span>
                    <img className="default-logo h-[50px] max-w-none" alt="Default Dark Logo" src={logo} />
                </div>
            </div>
        </div>
    );
}