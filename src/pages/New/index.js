import React, {useState, useMemo} from 'react' 
import './styles.css';
import api from '../../services/api'


import camera from '../../assets/camera.svg'
export default function New({history}){
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    
    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail): null;
        }, 
        [thumbnail]
    )
    
    async function handleSubmit(event){
        event.preventDefault()
        const data = new FormData();
        data.append('thumbnail', thumbnail)
        data.append('company', company)
        data.append('techs', techs)
        data.append('price', price)
        await api.post('/spots', data, {
            headers: {"user_id": localStorage.getItem('user')}
        })
        history.push('/dashboard')
    }

    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? `has-thumbnail` : ''}
            >
                    <input type="file" onChange={event=> setThumbnail(event.target.files[0])}/>
                    <img src={camera} alt="Select img" />
            </label>

            <label htmlFor="company">Empresa *</label>
            <input 
                id="company"
                placeholder="Sua empresa incrível"
                value={company}
                onChange={e=> setCompany(e.target.value)}
            />

            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por virgula)</span></label>
            <input 
                id="techs"
                placeholder="Quais tecnologias usam"
                value={techs}
                onChange={e=> setTechs(e.target.value)}
            />

            <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para gratuito)</span></label>
            <input 
                id="price"
                placeholder="Quais tecnologias usam"
                value={price}
                onChange={e=> setPrice(e.target.value)}
            />

            <button type="submit" className="btn">Cadastrar</button>

        </form>
    )
}