function Nutrition ({label, quantity, unit}) {
    return (
<div>
    <p><b>{label}</b> - {quantity} {unit}</p>
    <p></p>
</div>
    )
}
export default Nutrition;