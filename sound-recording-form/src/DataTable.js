// This component should be in the same file as your form or imported into it
const DataTable = ({ data }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Doctor's Name</th>
            <th>Patient's Name</th>
            <th>Patient’s Age</th>
            <th>Date of Recording</th>
            <th>Sound File</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.doctorName}</td>
              <td>{item.patientName}</td>
              <td>{item.patientAge}</td>
              <td>{item.dateOfRecording}</td>
              <td>
                <audio controls>
                  <source src={URL.createObjectURL(item.soundFile)} type="audio/mpeg" />
                </audio>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  