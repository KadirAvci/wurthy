import { CardHoverEffectDemo } from "@/components/demo/CardHoverDemo";
import ExpandableCardDemo from "@/components/expandable-card-demo-standard";
import { CardSpotlightDemo } from "@/components/demo/CardSpotlightDemo";
function Dashboard() {
    return (
        <div className="tw:flex tw:flex-col tw:lg:px-8">
            <h1>Dashboard</h1>
            <CardHoverEffectDemo />
            <ExpandableCardDemo />
            <CardSpotlightDemo />
        </div>
    );
}

export default Dashboard;
