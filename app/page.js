'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Items from './components/Items'
import { useFetch } from './operations/useFetch'
import { apiUrl } from './modules/api.modules'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Dropdown } from 'react-bootstrap'



export default function Home() {
  
  return (
    <>
      
      <Items/>
    </>
  )
}
