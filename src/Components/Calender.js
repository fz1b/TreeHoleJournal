import {Calendar} from 'antd';
import 'antd/dist/antd.css';
function Calender(){
    function onPanelChange(value, mode) {
      }
return(
    <div className="site-calendar-demo-card">
    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
  </div>
    
)
}
export default Calender