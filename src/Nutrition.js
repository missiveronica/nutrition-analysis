
function Nutrition ({label, quantity, unit}) {
    return (
        <div className="cont">
<ul className="nutr">
    <li><b>{label}</b> - {quantity} {unit}</li>
</ul>
</div>
    )
}
export default Nutrition;