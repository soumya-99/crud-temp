interface TextInputProps {
    label: string
    name: string
    value: string
    onChange: (e: any) => void
}

function TextInput({ label, name, value, onChange }: TextInputProps) {
    return (
        <>
            <div>
                <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
                <input type="text" value={value} id={name} name={name} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required />
            </div>
        </>
    )
}

export default TextInput