import React, {useContext, useState,useMemo, useEffect} from 'react'
import { Helmet } from 'react-helmet-async'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Store } from '../Store'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import Data from './Data'


function Sell() {
  return (
    <div>Sell</div>
  )
}

export default Sell