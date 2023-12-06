'use client'
import { useState, useEffect} from 'react'
import { Dialog, Combobox } from '@headlessui/react'
import { CiSearch } from "react-icons/ci";
import { useRouter } from 'next/navigation'
import { MdFindInPage } from "react-icons/md";



function CommandPallet({projects}) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const filterdProjects = query ? projects.filter((project) => project.title.toLowerCase().includes(query.toLowerCase())) : []

    useEffect(() => {
        function onKeydown(event){
            if(event.key === 'k' && (event.metaKey || event.crtlKey)){
                setIsOpen(!isOpen)
            }
        }
        window.addEventListener('keydown', onKeydown)
        return () => {
            window.removeEventListener('keydown', onKeydown)
        }
    }, [isOpen])

  return (
    <div>
        <Dialog className="fixed inset-0 p-4 pt-40 overflow-y-auto" open={isOpen} onClose={setIsOpen} >
            <Dialog.Overlay className="fixed inset-0 bg-gray-400 opacity-50"/>
            <Combobox
                onChange={(project) => {
                    setIsOpen(false)
                    router.push(`http://localhost:3000/${project.page}`)

            }}
            as="div" className="relative bg-white max-w-xl mx-auto rounded-xl shadow-md divide-y divide-grey-100 overflow-hidden">
                <div className="flex items-center px-4">
                    <CiSearch className="h-6 w-6 text-grey-500" />
                    <Combobox.Input
                    onChange={(event)=> {
                       setQuery(event.target.value); 
                    }} 
                    className="w-full bg-transparent border-0 focus:ring-0 text-sm placehoder-text-grey-400 h-10" placeholder="Search" /> 
                </div>
                {filterdProjects.length > 0 && (
                    <Combobox.Options static className="max-h-90 py-4 text-sm overflow-y-auto">
                    {filterdProjects.map((project) => (
                         <Combobox.Option className="" key={project.key} value={project}>
                             {({ active }) => (
                                 <div className={`flex flex-col px-4 py-2 ${active ? 'bg-blue-600' : 'bg-white'}`}>

                                    <div className={`font-semibold font-md ${active ? 'text-white' : 'text-black'}`}>{project.title}</div>
                                    <div className={`${active ? 'text-indigo-200' : 'text-gray-400'} text-xs`} >page => {project.route}</div> 
                                    
                                 </div>
                                 )}
                         </Combobox.Option>
 
                    )
                    )} 
                     
                     
                 </Combobox.Options>
                )}
                {
                    query && filterdProjects.length === 0 && (
                        <p className="p-4 text-sm text-gray-500">no results found</p>
                    )
                }
            </Combobox>
        </Dialog>
    </div>
  )
}


export default CommandPallet