const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '51427f28b5mshfbd0334a294cd80p16ef0fjsn7d95525de3a3',
        'X-RapidAPI-Host': 'fia-formula-1-championship-statistics.p.rapidapi.com',
    },
};

function refreshStandings() {
    fetch('https://fia-formula-1-championship-statistics.p.rapidapi.com/api/standings/drivers-standings?year=2022', options)
        .then((response) => response.json())
        .then((response) => {
            const data = response.driverStandings;

            // create a table
            const table = document.createElement('table');

            // create headers row
            const headersRow = document.createElement('tr');
            const rankHeader = document.createElement('th');
            rankHeader.textContent = 'Place';
            const lastnameHeader = document.createElement('th');
            lastnameHeader.textContent = 'Name';
            const pointsHeader = document.createElement('th');
            pointsHeader.textContent = 'Points';
            headersRow.appendChild(rankHeader);
            headersRow.appendChild(lastnameHeader);
            headersRow.appendChild(pointsHeader);
            table.appendChild(headersRow);

            // loop through each driver and create a row in the table
            data.forEach((driver, index) => {
                const row = document.createElement('tr');

                const rankCell = document.createElement('td');
                rankCell.textContent = index + 1;
                row.appendChild(rankCell);

                const lastnameCell = document.createElement('td');
                lastnameCell.textContent = driver.driver.lastname;
                row.appendChild(lastnameCell);

                const pointsCell = document.createElement('td');
                pointsCell.textContent = driver.pts;
                row.appendChild(pointsCell);

                table.appendChild(row);
            });

            // add CSS style to the table rows
            table.style.borderCollapse = 'collapse';
            const rows = table.getElementsByTagName('tr');
            for (let i = 0; i < rows.length; i++) {
                rows[i].style.borderBottom = '1px solid black';
            }

            // replace any existing content in the div with the new table
            const contentDiv = document.getElementById('content');
            contentDiv.innerHTML = '';
            contentDiv.appendChild(table);
            // hide the button
            const button = document.getElementById('refresh');
            button.style.display = 'none';
        })
        .catch((err) => console.error(err));
}


window.onload = function() {
    var butt = document.getElementById('refresh');
    if (butt) {
        butt.addEventListener('click', refreshStandings);
    }
};