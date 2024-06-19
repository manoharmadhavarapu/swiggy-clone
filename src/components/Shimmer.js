// This component is fake which can be used as loading page instead of spinner loaders.
// This is known as shimmer ui.

const Shimmer = () => {
    return (
        <div className="w-[80%] m-auto ">
            <div className="flex items-center justify-between overflow-hidden mb-[20px]">
                <div className="w-[100px] h-[100px] bg-slate-100 rounded-[50%]"></div>
                <div className="w-[100px] h-[100px] bg-slate-100 rounded-[50%]"></div>
                <div className="w-[100px] h-[100px] bg-slate-100 rounded-[50%]"></div>
                <div className="w-[100px] h-[100px] bg-slate-100 rounded-[50%]"></div>
                <div className="w-[100px] h-[100px] bg-slate-100 rounded-[50%]"></div>

            </div>
            <div className="w-[40%] bg-slate-100 rounded-xl h-[40px] my-[20px]"></div>
            <div className="flex items-center justify-between flex-wrap ">
                <div className="w-[250px] h-[300px] bg-slate-100 my-3 rounded-xl"></div>
                <div className="w-[250px] h-[300px] bg-slate-100 my-3 rounded-xl"></div>
                <div className="w-[250px] h-[300px] bg-slate-100 my-3 rounded-xl"></div>
                <div className="w-[250px] h-[300px] bg-slate-100 my-3 rounded-xl"></div>
                <div className="w-[250px] h-[300px] bg-slate-100 my-3 rounded-xl"></div>
                <div className="w-[250px] h-[300px] bg-slate-100 my-3 rounded-xl"></div>
                <div className="w-[250px] h-[300px] bg-slate-100 my-3 rounded-xl"></div>
                <div className="w-[250px] h-[300px] bg-slate-100 my-3 rounded-xl"></div>
                <div className="w-[250px] h-[300px] bg-slate-100 my-3 rounded-xl"></div>
                <div className="w-[250px] h-[300px] bg-slate-100 my-3 rounded-xl"></div>
                <div className="w-[250px] h-[300px] bg-slate-100 my-3 rounded-xl"></div>
                <div className="w-[250px] h-[300px] bg-slate-100 my-3 rounded-xl"></div>
                <div className="w-[250px] h-[300px] bg-slate-100 my-3 rounded-xl"></div>
            </div>
        </div>
    )
}

export default Shimmer;