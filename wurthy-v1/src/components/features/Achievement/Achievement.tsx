import { Card, CardContent } from "@/components/ui/card";
import onlineGame from "@/assets/images/custom-icon/online-game.svg";
import gamerCoin from "@/assets/images/custom-icon/gamer-coin.svg";
import diamond from "@/assets/images/custom-icon/gamer-diamond.svg";
import trophies from "@/assets/images/custom-icon/gamer-trophy.svg";

function Achievement() {
    return (
        <div className={'col-span-2 lg:col-span-3'}>
            <Card className="items-stretch rounded-xl bg-card border border-border shadow-xs black/5">
                <CardContent className="grow p-5">
                    <div className="flex flex-wrap px-5 lg:px-10 py-1 gap-2">
                        <div className="grid md:flex-1">
                            <div className="flex justify-self-center items-center gap-3">
                                <img className="h-10 max-w-full" alt="image" src={onlineGame} />
                                <div className="grid grid-cols-1 place-content-center flex-1">
                                    <span className="text-mono text-2xl lg:text-2xl font-semibold">164</span>
                                    <span className="text-secondary-foreground text-sm">Tournaments</span>
                                </div>
                            </div>
                        </div>

                        <span className="not-last:border-e border-e-input my-1"></span>

                        <div className="grid md:flex-1">
                            <div className="flex justify-self-center items-center gap-3">
                                <img className="h-10 max-w-full" alt="image" src={gamerCoin} />
                                <div className="grid grid-cols-1 place-content-center flex-1">
                                    <span className="text-mono text-2xl lg:text-2xl font-semibold">73.2%</span>
                                    <span className="text-secondary-foreground text-sm">Game Win-rate</span>
                                </div>
                            </div>
                        </div>

                        <span className="not-last:border-e border-e-input my-1"></span>

                        <div className="grid md:flex-1">
                            <div className="flex justify-self-center items-center gap-3">
                                <img className="h-10 max-w-full" alt="image" src={diamond} />
                                <div className="grid grid-cols-1 place-content-center flex-1">
                                    <span className="text-mono text-2xl lg:text-2xl font-semibold">257</span>
                                    <span className="text-secondary-foreground text-sm">Duels Played</span>
                                </div>
                            </div>
                        </div>

                        <span className="not-last:border-e border-e-input my-1"></span>

                        <div className="grid md:flex-1">
                            <div className="flex justify-self-center items-center gap-3">
                                <img className="h-10 max-w-full" alt="image" src={trophies} />
                                <div className="grid grid-cols-1 place-content-center flex-1">
                                    <span className="text-mono text-2xl lg:text-2xl font-semibold">19</span>
                                    <span className="text-secondary-foreground text-sm">Trophies</span>
                                </div>
                            </div>
                        </div>
                        <span className="not-last:border-e border-e-input my-1"></span></div>
                </CardContent>
            </Card>

        </div>

    );
}

export default Achievement;