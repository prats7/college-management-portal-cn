import React, { Fragment, useState } from 'react';
import { Button } from 'reactstrap';


const SetMarks = () => {
    const [marks, setMarks] = useState(0);

    return (
        <Fragment>
            <h4>{marks} / 100</h4>
            <Button type="submit" onClick={() => setMarks(marks + 20)}>🔳</Button>
        </Fragment>
    );
}
export default SetMarks;