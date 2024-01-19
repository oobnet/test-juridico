
import React, { useState, useEffect } from 'react';

import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { TreeSelect } from 'primereact/treeselect';
import { Button } from 'primereact/button';
import {Card} from 'primereact/card'
import axios from 'axios'

export default function AdvancedFilterDemo() {
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [nodes, setNodes] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [users, setUsers] = useState([]);
    const [companie, setCompanie] = useState(null);
    
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cord_x, setCordX] = useState('');
    const [cord_y, setCordY] = useState('');
    const [addUser, setAddUser] = useState(false);
    const baseUrl = 'http://localhost:3000'
 
    useEffect(() => {
        getCompanies()
    }, []);

    async function getCompanies(){
      const response = await axios.get(`${baseUrl}/companies`)
      const {data,status} = response.data
      if(status){
        const users = data.map( resp => {
          return {key:resp.id,label:resp.nome}
        })
        setNodes([{key:null,label: 'Limpar Campo'},...users])
        setCompanies(data)
      }
    }


    async function getUsers(user_id){
      
      const response = await axios.get(`${baseUrl}/companies/${user_id}/users`)
      const {data,status} = response.data
      if(status){
        const users = data.map( resp => {
          return {key:resp.id,label:resp.nome}
        })
      
        setUsers(data)
      }
    }

    async function createdUSer(){
      const content = {
        nome,telefone,email,cord: {x:cord_x,y:cord_y},user_id:selectedNodeKey,
        x:cord_x,y:cord_y
      }
     
      setLoading(true)
      const response = await axios.post(`${baseUrl}/users`,content)
    
      const {data,status} = response.data
      if(status){
        clearInputs()
        setNodes([])
        setCompanies([])
        await  getCompanies(data)
        setLoading(false)
      }
    }

    function clearInputs(){
      setNome('')
      setEmail('')
      setTelefone('')
      setCordX('')
      setCordY('')
      setSelectedNodeKey(null)
      setAddUser(false)
    }

    const clearFilter = async() => {
      await getCompanies()
      initFilters();
    };

    async function cancelSub(){
      clearInputs()
    }

  

    const onGlobalFilterChange = async (e) => {
      const {value} = e.target;
        setGlobalFilterValue(value);
        const comp = companies.filter( resp => {
        
          const {nome, telefone,email} = resp
          if(nome || telefone || email){
            return nome.indexOf(value) !== -1 || telefone.indexOf(value) !== -1 || email.indexOf(value) !== -1;
          }

        })
        setCompanies(comp)
    };

    const initFilters = () => {
        setFilters({
            nome: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            telefone: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        });
        setGlobalFilterValue('');
    };

    const renderHeader = () => {
        return (
          <>
            <div className="d-flex flex justify-content-between">
              <Button type="button"   severity="help"  icon="pi" label="ADICIONAR" outlined onClick={evt => setAddUser(true)} />
                <div >
                    <span className="p-input-icon-left" >
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue}  onChange={onGlobalFilterChange} placeholder="Pesquisar" />
                    </span>
                    <Button type="button"  severity="warning"  icon="pi" label="Limpar" outlined onClick={clearFilter} />
              
                </div>
            </div>
          </>
        );
    };

    const renderHeader2 = () => {
      return (
        <>
          <div className="d-flex flex justify-content-between">
            <Button type="button"   severity="help"  icon="pi" label="VOLTAR" outlined onClick={evt => setCompanie(null)} />
              <div >
                  <span className="p-input-icon-left" >
                      <i className="pi pi-search" />
                      <InputText value={globalFilterValue}  onChange={onGlobalFilterChange} placeholder="Pesquisar" />
                  </span>
                  <Button type="button"  severity="warning"  icon="pi" label="Limpar" outlined onClick={clearFilter} />
            
              </div>
          </div>
        </>
      );
  };

 
 

  
   
  
    const [selectedCompanie, setSelectedCompanie] = useState(null);
    const [selectUsers, setSelectUsers] = useState(null);
    
    // const toast = useRef(null);

   async function onRowSelect  (event)  {
      const {data} = event
      setCompanie(data)
      getUsers(data.id)
 
    };


   async function otimizarRota(){
    const response = await axios.get(`${baseUrl}/otimizar-rota/${companie?.id}`)
    const {status,data} = response.data
    if(status){
      const users = data.map( resp => {
        return {key:resp.id,label:resp.nome}
      })
    
      setUsers(data)
    }
    console.log('response: ', response);
   
   }

    const onRowUnselect = (event) => {};
    // setCompanie
    const header = renderHeader();
    const header2 = renderHeader2();

    return (
     <>
      <div className="d-flex justify-content-center p-4">
        <h2 className="m-0">TESTE JURIDICO</h2>
      </div>
     
       
<div className="container">

    <div className={`${addUser ? '' : 'd-none'}`}>
            <TreeSelect value={selectedNodeKey} 
              onChange={(e) => setSelectedNodeKey(e.value)} options={nodes} 
                    className="mb-2 col-md-12" placeholder="Selecione Empresa">

                    </TreeSelect>
                  <InputText value={nome} onChange={evt => setNome(evt.target.value)} placeholder="Nome" className="form-control mb-2" />
                  <InputText value={email} onChange={evt => setEmail(evt.target.value)} placeholder="E-mail" className="form-control mb-2" />
                  <InputText value={telefone} onChange={evt => setTelefone(evt.target.value)} placeholder="Telefone" className="form-control mb-2" />
                  <InputText value={cord_x} onChange={evt => setCordX(evt.target.value)} placeholder="Cordenada X" className="form-control mb-2" />
                  <InputText value={cord_y} onChange={evt => setCordY(evt.target.value)} placeholder="Cordenada Y" className="form-control mb-2" />
                  <Button label="ADICIONAR" onClick={createdUSer} severity="success" className='col-md-6' />
                  <Button label="CANCELAR" onClick={cancelSub} severity="danger" className='col-md-6' />
            </div>
          
    </div>
      

  

      <div className={`${addUser || companie ? 'd-none' : ''}`}>
         <DataTable
          value ={companies} 
          paginator  
          rows={10} 
          loading={loading} 
          dataKey="id" 
          filters={filters} 
          globalFilterFields={['nome','email']}
          header={header} 
          emptyMessage="Empresa não encontrada"
          selectionMode="single" selection={selectedCompanie} onSelectionChange={(e) => setSelectedCompanie(e.value)} 
          onRowSelect={onRowSelect} onRowUnselect={onRowUnselect} metaKeySelection={false} tableStyle={{ minWidth: '50rem' }}>
                <Column field="nome" header="Code"></Column>
                <Column field="email" header="Name"></Column>
                <Column field="telefone" header="Category"></Column>
            </DataTable>
         </div>
   

        <div className={`${companie ? '' : 'd-none'}`} >
            <Card title={companie?.nome}>
                <p className="m-0">
                   {companie?.email}
                </p>



                <DataTable
                value ={users} 
                paginator  
                rows={10} 
                loading={loading} 
                dataKey="id" 
                filters={filters} 
                globalFilterFields={['nome','email']}
                header={header2} 
                emptyMessage="Empresa não encontrada"
                
                 tableStyle={{ minWidth: '50rem' }}>
                      <Column field="nome" header="Code"></Column>
                      <Column field="email" header="Name"></Column>
                      <Column field="telefone" header="Telefone"></Column>
                      <Column field="x" header="Cordenada X"></Column>
                      <Column field="y" header="Cordenada Y"></Column>
                  </DataTable>
            </Card>

            <Button label="Otimizar-rota" onClick={otimizarRota} severity="help" className='col-md-3 mt-1' />
           
        </div>

    </>
        
      
         
    );
}
        