import React, { useState, useEffect, useTable } from 'react';

export function InfoPage() {
  return (
    <div className="infoPage">
      <p>Thanks for playing the Racoon Memory Game!</p>
      <p>
        {'   '}
        This app was built to flex Javascript React Frontend and it's
        interaction with a MongoDB Backend.
      </p>
      <br />
      <p>
        I would like to thank Misha, Pgui and MaxaMillion in no particular order
        for their help with callback understanding, webhosting and
        troubleshooting, and react to backend basics respectively.
      </p>
    </div>
  );
}

// export default
