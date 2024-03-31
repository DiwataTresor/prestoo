import { myContainerDashboard } from "@/app/style/global";
import NavigationComponent from "@/app/components/NavigationComponent"

const LayoutDashboardMain=({children,navigationBar,showNavigation,hideNavigationBar})=>{
    return(
        <div className="bg-slate-400 py-6">
            <div className={myContainerDashboard}>
                {hideNavigationBar || <NavigationComponent titre={navigationBar} />}
                {children}
            </div>
        </div>
    )
}
export default LayoutDashboardMain