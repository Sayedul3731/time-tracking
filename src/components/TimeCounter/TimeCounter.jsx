import { useEffect, useState } from 'react';

const TimeCounter = () => {
    const [liveTime, setLiveTime] = useState({ s: 0, m: 0, h: 0 });

    useEffect(() => {
        const id = setInterval(() => {
            setLiveTime(prevTime => {
                let updatedLS = prevTime.s + 1;
                let updatedLM = prevTime.m;
                let updatedLH = prevTime.h;

                if (updatedLS === 60) {
                    updatedLM++;
                    updatedLS = 0;
                }
                if (updatedLM === 60) {
                    updatedLH++;
                    updatedLM = 0;
                }

                return { s: updatedLS, m: updatedLM, h: updatedLH };
            });
        }, 1000);

        // Clean up interval when the component is unmounted
        return () => clearInterval(id);
    }, []);

    return (
        <div>
            <div className="flex justify-center items-center">
                <span className="bg-[#e2711d] px-5 py-2 mr-1 text-white">{(liveTime.h >= 10) ? liveTime.h : "0" + liveTime.h} h</span>
                <span className="bg-[#e2711d] px-5 py-2 mr-1 text-white">{(liveTime.m >= 10) ? liveTime.m : "0" + liveTime.m} m</span>
                <span className="bg-[#e2711d] px-5 py-2 mr-1 text-white">{(liveTime.s >= 10) ? liveTime.s : "0" + liveTime.s} s</span>
            </div>
        </div>
    );
};

export default TimeCounter;
