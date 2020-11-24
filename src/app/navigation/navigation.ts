import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'admin',
        title    : 'Administración de Usuarios',
        type     : 'group',
        children : [
            {
                id       : 'crear-usuario',
                title    : 'Crear Usuario',
                icon : 'accessibility_new',
                type     : 'item',
                url      : '/crear-usuario',
            },
            {
                id       : 'editar-usuario',
                title    : 'Editar Usuario',
                icon : 'edit',
                type     : 'item',
                url      : '/editar-usuario',
            },
            {
                id       : 'eliminar-usuario',
                title    : 'Eliminar Usuario',
                icon : 'delete',
                type     : 'item',
                url      : '/eliminar-usuario',
            }
        ]
        
        
    },
    {
        id       : 'proyecto',
        title    : 'Proyecto',
        type     : 'group',
        children : [
            {
                id       : 'crear-proyecto',
                title    : 'Crear Proyecto',
                icon : 'create_new_folder',
                type     : 'item',
                url      : '/crear-proyecto',
            },
            {
                id       : 'lista-proyectos',
                title    : 'Editar Proyecto',
                icon : 'edit',
                type     : 'item',
                url      : '/lista-proyectos',
            },
           
        ]
        
        
    },
    {
        id       : 'documentos',
        title    : 'Documentos',
        type     : 'group',
        children : [
            {
                id       : 'crear-archivo',
                title    : 'Subir documento',
                icon : 'create_new_folder',
                type     : 'item',
                url      : '/crear-archivo',
            },
            {
                id       : 'borrar-archivo',
                title    : 'Borrar Documento',
                icon : 'edit',
                type     : 'item',
                url      : '/borrar-archivo',
            },
            {
                id       : 'editar-documento',
                title    : 'Editar Documentos',
                icon : 'edit',
                type     : 'item',
                url      : '/editar-documentos',
            },
           
        ]
        
        
    },
    {
        id       : 'categoria',
        title    : 'Categorias',
        type     : 'group',
        children : [
            {
                id       : 'crear-categoria',
                title    : 'Crear Categoria',
                icon : 'create_new_folder',
                type     : 'item',
                url      : '/crear-categoria',
            },
            {
                id       : 'borrar-categoria',
                title    : 'Borrar Categoria',
                icon : 'edit',
                type     : 'item',
                url      : '/borrar-categoria',
            },
        ]
        
        
    },

    
];
