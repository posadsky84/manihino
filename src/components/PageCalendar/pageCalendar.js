import "./pageCalendar.css";



const PageCalendar = ({ season, selectDay, calendar }) => {

  const months = [`январь`,`февраль`,`март`,`апрель`,`май`,`июнь`,
                  `июль`,`август`,`сентябрь`,`октябрь`,`ноябрь`,`декабрь`,];

  return (
    <div className="page-calendar">
      <div className="calendar">
        {months.map((mon, monthIndex) => {
          return <div className="month">
                 <div className="label-month">{mon}</div>
                 <div className="month-card">
            {[...Array(new Date(season, monthIndex, 1).getDay()).keys()].map((item) => (item > 0) && <div className="day no-day" />)
            }
            {[...Array((new Date(season, monthIndex + 1, 0)).getDate()).keys()].map((item) => {
                const dayInCalendar = calendar[`${season}-${("0" + (monthIndex + 1)).slice(-2)}-${("0" + (item + 1)).slice(-2)}`];
                const dayClass = dayInCalendar ?
                  (dayInCalendar.cnt < 4 ? `day with-plays plays${dayInCalendar.cnt}` : `day with-plays plays4plus`) : `day`;
                return <div className={dayClass} onClick={() => selectDay(new Date(season, monthIndex, item))}
                />;
            })
            }
          </div>
          </div>;
          })

        }
      </div>
      <div className="day-history">

      </div>
    </div>
  );


}


export default PageCalendar;