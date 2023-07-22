import "./progressbar.css"
export const ProgressBar =({value})=>{
    console.log(value);
    return(
    <div className="progress">
        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={7} aria-valuemin={0} aria-valuemax={287} style={{ width: `${value}%` }} />
    </div>

    )
 };