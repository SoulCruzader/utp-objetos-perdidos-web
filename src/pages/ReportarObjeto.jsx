
import { useEffect, useState } from "react";

const formularioInicial = {
  nombre: "",
  descripcion: "",
  categoria: "",
  fecha: "",
  lugar: ""
};

export default function ReportarObjeto() {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [foto, setFoto] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState("");
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    return () => {
      if (vistaPrevia) {
        URL.revokeObjectURL(vistaPrevia);
      }
    };
  }, [vistaPrevia]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value
    }));

    setErrores((actual) => ({
      ...actual,
      [name]: ""
    }));

    setMensaje("");
  };

  const manejarFoto = (e) => {
    const archivo = e.target.files?.[0];

    setMensaje("");

    if (!archivo) return;

    const formatos = ["image/jpeg", "image/png", "image/webp"];

    if (!formatos.includes(archivo.type)) {
      setFoto(null);
      setVistaPrevia("");
      setErrores((actual) => ({
        ...actual,
        foto: "Solo se permiten imágenes JPG, PNG o WEBP."
      }));
      e.target.value = "";
      return;
    }

    if (archivo.size > 5 * 1024 * 1024) {
      setFoto(null);
      setVistaPrevia("");
      setErrores((actual) => ({
        ...actual,
        foto: "La imagen no debe superar los 5 MB."
      }));
      e.target.value = "";
      return;
    }

    setFoto(archivo);
    setVistaPrevia(URL.createObjectURL(archivo));

    setErrores((actual) => ({
      ...actual,
      foto: ""
    }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    const nuevosErrores = {};

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = "Ingresa el nombre del objeto.";
    }

    if (!formulario.descripcion.trim()) {
      nuevosErrores.descripcion = "Ingresa una descripción.";
    }

    if (!formulario.categoria) {
      nuevosErrores.categoria = "Selecciona una categoría.";
    }

    if (!formulario.fecha) {
      nuevosErrores.fecha = "Selecciona la fecha.";
    }

    if (!formulario.lugar.trim()) {
      nuevosErrores.lugar = "Ingresa el lugar aproximado.";
    }

    if (!foto) {
      nuevosErrores.foto = "Debes adjuntar una fotografía.";
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      setMensaje("");
      return;
    }

    setMensaje(
      "Formulario validado correctamente. La conexión para guardar el reporte en Supabase está pendiente."
    );
  };

  return (
    <section className="page-section">
      <div className="form-heading">
        <span className="form-tag">OBJETOS PERDIDOS UTP</span>

        <h1>Reportar objeto perdido</h1>

        <p>
          Completa los siguientes datos para informar sobre el objeto
          que has perdido y facilitar su identificación.
        </p>
      </div>

      <form className="lost-form" onSubmit={manejarEnvio} noValidate>
        <div className="form-field">
          <label htmlFor="nombre">Nombre del objeto *</label>

          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Ej. Mochila negra"
            value={formulario.nombre}
            onChange={manejarCambio}
          />

          {errores.nombre && (
            <small className="field-error">{errores.nombre}</small>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="categoria">Categoría *</label>

          <select
            id="categoria"
            name="categoria"
            value={formulario.categoria}
            onChange={manejarCambio}
          >
            <option value="">Selecciona una categoría</option>
            <option value="Electronica">Equipos electrónicos</option>
            <option value="Documentos">Documentos</option>
            <option value="Accesorios">Accesorios</option>
            <option value="Ropa">Ropa y objetos personales</option>
            <option value="Otros">Otros</option>
          </select>

          {errores.categoria && (
            <small className="field-error">{errores.categoria}</small>
          )}
        </div>

        <div className="form-field form-field-full">
          <label htmlFor="descripcion">Descripción del objeto *</label>

          <textarea
            id="descripcion"
            name="descripcion"
            rows="4"
            placeholder="Describe el objeto, su color, marca y características..."
            value={formulario.descripcion}
            onChange={manejarCambio}
          />

          {errores.descripcion && (
            <small className="field-error">{errores.descripcion}</small>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="fecha">Fecha de pérdida *</label>

          <input
            id="fecha"
            name="fecha"
            type="date"
            value={formulario.fecha}
            onChange={manejarCambio}
          />

          {errores.fecha && (
            <small className="field-error">{errores.fecha}</small>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="lugar">Lugar aproximado *</label>

          <input
            id="lugar"
            name="lugar"
            type="text"
            placeholder="Ej. Biblioteca, Torre A"
            value={formulario.lugar}
            onChange={manejarCambio}
          />

          {errores.lugar && (
            <small className="field-error">{errores.lugar}</small>
          )}
        </div>

        <div className="form-field form-field-full">
          <label htmlFor="foto">Fotografía del objeto *</label>

          <div className="photo-upload">
            <input
              id="foto"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={manejarFoto}
            />

            <p>Formatos JPG, PNG o WEBP. Tamaño máximo: 5 MB.</p>
          </div>

          {errores.foto && (
            <small className="field-error">{errores.foto}</small>
          )}

          {vistaPrevia && (
            <div className="photo-preview">
              <img
                src={vistaPrevia}
                alt="Vista previa del objeto perdido"
              />

              <p>{foto?.name}</p>
            </div>
          )}
        </div>

        <div className="form-field form-field-full">
          <button className="lost-submit" type="submit">
            Validar reporte
          </button>
        </div>

        {mensaje && (
          <p className="form-success" role="status">
            {mensaje}
          </p>
        )}
      </form>
    </section>
  );
}