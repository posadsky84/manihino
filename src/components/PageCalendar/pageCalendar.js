import "./pageCalendar.css";



const PageCalendar = ({ season, selectDay }) => {

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
                return <div className="day" onClick={() => selectDay(new Date(season, monthIndex, item))}
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