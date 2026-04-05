import { GL } from "./gl";
import { Pill } from "./Pill";
import { Button } from "./ui/button";
import { useState } from "react";
import { Header } from "./Header";

export function Hero() {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="flex flex-col h-svh justify-between relative z-10">
      <GL hovering={hovering} />
      <Header />

      <div className="pb-16 mt-auto text-center relative">
        <Pill className="mb-6">LIVE TRADING</Pill>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient">
          <span className="text-glow text-primary">Торгуй</span> крипто <br />
          <i className="font-light">без границ</i>
        </h1>
        <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance mt-8 max-w-[480px] mx-auto">
          Мгновенные сделки, минимальные комиссии, максимальная безопасность. Трейдинг нового поколения.
        </p>

        <a className="contents max-sm:hidden" href="#trading">
          <Button
            className="mt-14 btn-glow"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [Начать торговлю]
          </Button>
        </a>
        <a className="contents sm:hidden" href="#trading">
          <Button
            size="sm"
            className="mt-14 btn-glow"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [Начать торговлю]
          </Button>
        </a>
      </div>
    </div>
  );
}
