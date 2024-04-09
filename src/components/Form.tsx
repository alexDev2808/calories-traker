import { useState, ChangeEvent } from "react";

import { categories } from "../data/categories";
import { Activity } from "../types";

export default function Form() {

    const [ activity, setActivity ] = useState<Activity>({
        category: 1,
        name: '',
        calories: 0
    })

    const handleChange = ( e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> ) => {

        const isNumberField = ['category', 'calories'].includes( e.target.id )

        setActivity({
            ...activity,
            [e.target.id] : isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity

        return name.trim() !== '' && calories > 0

    }

  return (
    <form
        className="space-y-5 bg-white shadow p-10 rounded-lg"
    >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category">Categoria: </label>
            <select
                id="category"
                className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                value={ activity.category }
                onChange={ handleChange }
            >
                { categories.map( category => (
                    <option
                        key={ category.id }
                        value={ category.id }
                    >
                        { category.name }
                    </option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name">Actividad: </label>
            <input 
                id="name"
                type="text"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej. Comida, Jugo de naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                value={ activity.name }
                onChange={ handleChange }

                />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories">Calorias: </label>
            <input 
                id="calories"
                type="number"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej.300, 500"
                value={ activity.calories }
                onChange={ handleChange }

                />
        </div>

        <input 
            type="submit" 
            className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
            value='Guardar'
            disabled={!isValidActivity()}
            />
    </form>
  )
}
