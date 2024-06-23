import MobileMenu from "./MobileMenu";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  return (
    <div className='p-4 flex justify-between items-center shadow-md'>
      <div className="font-medium text-sky-500">STEP Register</div>
      <div className="flex items-center gap-3">
        User data
        <ModeToggle />
        <MobileMenu />
      </div>
    </div>
  );
};

export default Header;
