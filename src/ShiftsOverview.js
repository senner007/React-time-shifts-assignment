import './shift-overview.css'

export function ShiftsOverview({ shifts }) {
  const shiftsItems = shifts.map((shiftItem) => {
    return (
      <li key={shiftItem.id}>
        <div>Name : {shiftItem.userName}</div>
        <div>Start date : {shiftItem.startDate.toString()}</div>
        <div>End Date : {shiftItem.endDate.toString()}</div>
      </li>
    );
  });

  return <ul>{shiftsItems}</ul>;
}
