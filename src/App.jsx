import {Routes, Route} from 'react-router-dom'
import AddCreator from './pages/AddCreator.jsx'
import ViewCreator from './pages/ViewCreator.jsx'
import EditCreator from './pages/EditCreator.jsx'
import ShowCreators from './pages/ShowCreators.jsx'

export default function App() {
  return (
    <Routes>
      <Route path = "/" element = {<ShowCreators />}/>
      <Route path = "/creators/new" element = {<AddCreator />}/>
      <Route path = "/creators/:id" element = {<ViewCreator />}/>
      <Route path = "/creators/:id/edit" element = {<EditCreator />}/>
    </Routes>
  )
}