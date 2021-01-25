import React, { Component } from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';

const List = ({list, index, name, ...rest}) => {
  return (
    <ul className="ul-list">
      {list.map((data) => {
        return (
          <li key={data[index]} className="ul-list-item">
            {data[name]}
          </li>
        );
      })}
    </ul>
  );
}


export default List;