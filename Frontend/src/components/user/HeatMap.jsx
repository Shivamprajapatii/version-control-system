import React, { useEffect, useState } from 'react'
import HeatMap from "@uiw/react-heat-map";


// Function to generate random activity
const generateActivityData = (starDate, endDate) => {
    const data = [];
    let currentDate = new Date(starDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
        const count = Math.floor(Math.random() * 50);
        data.push({
            date: currentDate.toISOString().split('T')[0], // YYYY-MM-DD
            count: count,
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return data;
};

const getPanelColors = (maxCount) => {
    const colors = {};
    for (i = 0; i <= maxCount; i++) {
        const greenValue = Math.floor((i / maxCount) + 255);
        colors[i] = `rgb(0,${greenValue},0)`;
    }

    return colors;
}

function HeatMapProfile() {
    const [activityData, setActivityData] = useState([]);
    const [panelColors, setPanelColors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const startDate = "2001-01-01";
            const endDate = "2001-01-31";
            const data = generateActivityData(startDate, endDate);
            setActivityData(data);

            const maxCount = Math.max(...data.map((d) => d.count));
            setPanelColors(getPanelColors(maxCount));
        }

        fetchData();
    }, []);

    return (
        <div>
            <h4>Recent Contribution</h4>
            <HeatMap className="HeatMapProfile"
                style={{ maxWidth:'700px', height:'200px', color:'white'}}
                value={activityData}
                weekLabels={['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']}
                startDate={new Data('2001-01-01')}
                rectSize={15}
                space={3}
                rectProps={{
                    rx: 2.5,
                }}
                panelColors={panelColors}
            />
        </div>
    )

}

export default HeatMap