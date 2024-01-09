import { useState } from 'react';

const ProjectTimer = () => {
    const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
    const [interV, setInterV] = useState();

    const start = () => {
        run();
        setInterV(setInterval(run, 1000));
    }
    const stop = () => {
        clearInterval(interV);
    }
    const resume = () => {
        clearInterval(interV);
        setTime({ s: 0, m: 0, h: 0 })
    }

    var updatedS = time.s, updatedM = time.m, updatedH = time.h;

    const run = () => {
        if (updatedM === 60) {
            updatedH++;
            updatedM = 0;
        }
        if (updatedS === 60) {
            updatedM++;
            updatedS = 0;
        }
        updatedS++;
        return setTime({ s: updatedS, m: updatedM, h: updatedH });
    }

    return (
        <div className=" flex justify-between px-4">
            <div>  <h1 className="text-2xl font-semibold text-white">Create New Project Here</h1></div>
            <div>
                <div className="flex justify-center items-center">
                    <span className="bg-[#e2711d] px-5 py-2 mr-1 text-white">{(time.h >= 10) ? time.h : "0" + time.h} h</span>
                    <span className="bg-[#e2711d] px-5 py-2 mr-1 text-white">{(time.m >= 10) ? time.m : "0" + time.m} m</span>
                    <span className="bg-[#e2711d] px-5 py-2 mr-1 text-white">{(time.s >= 10) ? time.s : "0" + time.s} s</span>
                </div>
                <div className="flex justify-center items-center mt-4 text-white">
                    <button onClick={start} className="border px-5 py-2">Start</button>
                    <button onClick={stop} className="border px-5 py-2 mx-2">Pause</button>
                    <button onClick={resume} className="border px-5 py-2">Resume</button>
                </div>
            </div>
        </div>
    );
};

export default ProjectTimer;
