var serv_capacitacionesId = ["3"];
var serv_capacitaciones = {
    "3": {
        "id": "3",
        "titulo": "Participantes PMA",
        "descripcion": "Capacitacion inicial, para participantes del PMA",
        "fecha": "2016-06-27 22:42:43",
        "activo": "1",
        "tipo": {
            "id": "1",
            "alias": "general",
            "nombre": "General",
            "descripcion": "Capacitacion para el publico en general"
        },
        "modulos": {
            "1": "5",
            "2": "6"
        }
    },
    "completo": false
};
var serv_modulos = {
    "5": {
        "id": "5",
        "titulo": { /* Se convierte en objeto*/
            texto: "La Alimentación",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_titulo.mp3",
                "nombre": "training\/audios\/L1_titulo.mp3",
                "loaded": "empty"
            }
        },
        "descripcion": { /* Se convierte en objeto*/
            texto: "El tema de Alimentación Saludable, le ayudará a identificar los alimentos y sus nutrientes para lograr una alimentación variada y sana. Usted aprenderá sobre:",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_descripcion.mp3",
                "nombre": "training\/audios\/L1_descripcion.mp3",
                "loaded": "empty"
            }
        },
        "imagen": {
            "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/201661102023887.jpg",
            "nombre": "training\/images\/201661102023887.jpg",
            "loaded": "empty"
        },
        "imagen2": { /*Nuevo: Se usa dentro del modulo*/
            "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/201661102023887.jpg",
            "nombre": "training\/images\/M1.png",
            "loaded": "empty"
        },
        "fecha": "2016-06-27 22:52:26",
        "activo": "1",
        "lecciones": ["16", "17", "18", "19", "20"],
        "completo": false
    },
    "6": {
        "id": "6",
        "titulo": { /* Se convierte en objeto*/
            texto: "La Alimentación",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_titulo.mp3",
                "nombre": "training\/audios\/L1_titulo.mp3",
                "loaded": "empty"
            }
        },
        "descripcion": { /* Se convierte en objeto*/
            texto: "El tema de Alimentación Saludable, le ayudará a identificar los alimentos y sus nutrientes para lograr una alimentación variada y sana. Usted aprenderá sobre:",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_descripcion.mp3",
                "nombre": "training\/audios\/L1_descripcion.mp3",
                "loaded": "empty"
            }
        },
        "imagen": {
            "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/201661102023887.jpg",
            "nombre": "training\/images\/201661102023887.jpg",
            "loaded": "empty"
        },
        "imagen2": { /*Nuevo: Se usa dentro del modulo*/
            "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/201661102023887.jpg",
            "nombre": "training\/images\/M1.png",
            "loaded": "empty"
        },
        "fecha": "2016-06-27 22:52:26",
        "activo": "1",
        "lecciones": ["16", "17", "18", "19", "20"],
        "completo": false
    }
};
var serv_lecciones = {
    "16": {
        "id": "16",
        "titulo": { /* Se convierte en objeto*/
            texto: "Alimentaci\u00f3n saludable",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_titulo.mp3",
                "nombre": "training\/audios\/L1_titulo.mp3",
                "loaded": "empty"
            }
        },
        "descripcion": "Alimentaci\u00f3n saludable",
        "imagen": {
            "url": "https:\/\/s3.amazonaws.com\/nutrifami\/",
            "nombre": "training\/images\/L1-ico.png",
            "loaded": "empty"
        },
        "fecha": "2016-06-27 22:55:40",
        "activo": "1",
        "unidades": ["1", "2", "3", "4"],
        "finalizado":{ /* Nuevo */
            texto:"Una alimentación saludable lo ayuda a tener una vida sana y activa!",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_END.mp3",
                "nombre": "training\/audios\/L1_END.mp3",
                "loaded": "empty"
            },
            puntos:"100"           
        },
        "completo": false
    },
    "17": {
        "id": "17",
        "titulo": { /* Se convierte en objeto*/
            texto: "Beneficios y Propiedades de los Alimentos",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_titulo.mp3",
                "nombre": "training\/audios\/L1_titulo.mp3",
                "loaded": "empty"
            }
        },
        "descripcion": "Beneficios y propiedades de los alimentos",
        "imagen": {
            "url": "https:\/\/s3.amazonaws.com\/nutrifami\/",
            "nombre": "training\/images\/L1-ico.png",
            "loaded": "empty"
        },
        "fecha": "2016-06-27 22:56:09",
        "activo": "1",
        "unidades": ["7", "8", "9", "10", "11", "12", "13", "15"],
        "completo": false
    },
    "18": {
        "id": "18",
        "titulo": { /* Se convierte en objeto*/
            texto: "Alimentaci\u00f3n Balanceada y Saludable",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_titulo.mp3",
                "nombre": "training\/audios\/L1_titulo.mp3",
                "loaded": "empty"
            }
        },
        "descripcion": "Alimentaci\u00f3n balanceada y saludable",
        "imagen": {
            "url": "https:\/\/s3.amazonaws.com\/nutrifami\/",
            "nombre": "training\/images\/L1-ico.png",
            "loaded": "empty"
        },
        "fecha": "2016-06-27 22:56:30",
        "activo": "1",
        "unidades": ["16", "17", "18", "19", "20", "21"],
        "completo": false
    },
    "19": {
        "id": "19",
        "titulo": { /* Se convierte en objeto*/
            texto: "Los Colores Alimenticios",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_titulo.mp3",
                "nombre": "training\/audios\/L1_titulo.mp3",
                "loaded": "empty"
            }
        },
        "descripcion": "Los colores alimenticios",
        "imagen": {
            "url": "https:\/\/s3.amazonaws.com\/nutrifami\/",
            "nombre": "training\/images\/L1-ico.png",
            "loaded": "empty"
        },
        "fecha": "2016-06-27 22:56:43",
        "activo": "1",
        "unidades": ["22", "23", "24", "25", "26", "27", "28"],
        "completo": false
    },
    "20": {
        "id": "20",
        "titulo": { /* Se convierte en objeto*/
            texto: "Agua Sana",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_titulo.mp3",
                "nombre": "training\/audios\/L1_titulo.mp3",
                "loaded": "empty"
            }
        },
        "descripcion": "Agua Sana ",
        "imagen": {
            "url": "https:\/\/s3.amazonaws.com\/nutrifami\/",
            "nombre": "training\/images\/L1-ico.png",
            "loaded": "empty"
        },
        "fecha": "2016-06-27 22:57:05",
        "activo": "1",
        "unidades": ["29", "30", "31", "32", "33"],
        "completo": false
    }
};
var serv_unidades = {
    "1": {
        "id": "1",
        "tipo": {
            "id": "4",
            "nombre": "Opción múltiple con única respuesta",
            "alias": "tipo4",
            "descripcion": "Lea y seleccione la respuesta correcta.",
            "icono": "ico-unidad-tipo-4.png", /* Nuevo */
            "audio": {
                "nombre": "unidad-tipo-4.mp3" /* Nuevo */
            }
        },
        "titulo": {
            texto: "La alimentaci\u00f3n es\u2026",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1.mp3",
                "nombre": "training\/audios\/L1_P1.mp3",
                "loaded": "empty"
            }
        },
        "instruccion": {
            texto: "Lea y seleccione la respuesta correcta",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1.mp3",
                "nombre": "training\/audios\/L1_P1.mp3",
                "loaded": "empty"
            }
        },
        "texto": null,
        "imagen": {
            "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L1_1.png",
            "nombre": "training\/images\/L1_1.png",
            "loaded": "empty"
        },
        "fecha": "2016-06-28 15:16:33",
        "activo": "1",
        "padre": "0",
        "hijo": "0",
        "opciones": {
            "1": {
                "id": "1",
                "correcta": "1",
                "orden": "1",
                "fecha": "2016-06-28 16:07:27",
                "visible": "1",
                "texto": "A. Una actividad b\u00e1sica para sobrevivir.",
                "feedback": {
                    texto: "Muy bien",
                    audio: {
                        "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1_b.mp3",
                        "nombre": "training\/audios\/L1_P1_b.mp3",
                        "loaded": "empty"
                    }
                },
                "audio": {
                    "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1_a.mp3",
                    "nombre": "training\/audios\/L1_P1_a.mp3", "loaded": "empty"}
            },
            "2": {
                "id": "2",
                "correcta": "0",
                "orden": "2",
                "fecha": "2016-06-28 16:07:31",
                "visible": "1",
                "texto": "B. Un alimento para crecer y estar sano.",
                "feedback": {
                    texto: "La alimentaci\u00f3n es una actividad en la que consumimos alimentos como frutas, verduras y otros. ",
                    audio: {
                        "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1_b.mp3",
                        "nombre": "training\/audios\/L1_P1_b.mp3",
                        "loaded": "empty"
                    }
                },
                "audio": {
                    "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1_b.mp3",
                    "nombre": "training\/audios\/L1_P1_b.mp3",
                    "loaded": "empty"
                }
            },
            "3": {
                "id": "3",
                "correcta": "0", "orden": "3", "fecha": "2016-06-28 16:07:31", "visible": "1", "texto": "C. Comprar alimentos.",
                "feedback": {
                    texto: "Para alimentarnos hay que conseguir los alimentos y comerlos.",
                    audio: {
                        "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1_b.mp3",
                        "nombre": "training\/audios\/L1_P1_b.mp3",
                        "loaded": "empty"
                    }
                },
                "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1_c.mp3", "nombre": "training\/audios\/L1_P1_c.mp3", "loaded": "empty"}}},
        "completo": false
    },
    "2": {
        "id": "2",
        "tipo": {
            "id": "4",
            "nombre": "Unica Respuesta",
            "alias": "tipo4",
            "descripcion": "Lea y seleccione la respuesta correcta.",
            "icono": "ico-unidad-tipo-4.png", /* Nuevo */
            "audio": {
                "nombre": "unidad-tipo-4.mp3" /* Nuevo */
            }
        },
        "titulo": {
            texto: "La alimentaci\u00f3n sirve para \u2026",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1.mp3",
                "nombre": "training\/audios\/L1_P1.mp3",
                "loaded": "empty"
            }
        },
        "instruccion": {
            texto: "Lea y seleccione la respuesta correcta",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1.mp3",
                "nombre": "training\/audios\/L1_P1.mp3",
                "loaded": "empty"
            }
        },
        "texto": null,
        "imagen": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L1_2.png", "nombre": "training\/images\/L1_2.png", "loaded": "empty"},
        "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P2.mp3", "nombre": "training\/audios\/L1_P2.mp3", "loaded": "empty"},
        "fecha": "2016-06-28 15:16:33",
        "activo": "1",
        "padre": "0",
        "hijo": "0",
        "opciones": {"4": {"id": "4", "correcta": "0", "orden": "1", "fecha": "2016-06-28 16:07:27", "visible": "1", "texto": "A. Estar llenos.", "feedback": "La alimentaci\u00f3n no es para estar llenos sino para sentirnos bien.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P2_a.mp3", "nombre": "training\/audios\/L1_P2_a.mp3", "loaded": "empty"}}, "5": {"id": "5", "correcta": "1", "orden": "2", "fecha": "2016-06-28 16:07:27", "visible": "1", "texto": "B. Mantener una buena salud y en los ni\u00f1os para crecer y desarrollarse.", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P2_b.mp3", "nombre": "training\/audios\/L1_P2_b.mp3", "loaded": "empty"}}, "6": {"id": "6", "correcta": "0", "orden": "3", "fecha": "2016-06-28 16:07:28", "visible": "1", "texto": "C. Estar enfermos.", "feedback": "Los alimentos contienen nutrientes  que nos ayudan a mantener la salud.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P2_c.mp3", "nombre": "training\/audios\/L1_P2_c.mp3", "loaded": "empty"}}},
        "completo": false
    },
    "3": {
        "id": "3",
        "tipo": {
            "id": "3",
            "nombre": "Multiple Respuesta",
            "alias": "tipo3",
            "descripcion": "Seleccione todas las respuestas correcatas.",
            "icono": "ico-unidad-tipo-3.png", /* Nuevo */
            "audio": {
                "nombre": "unidad-tipo-3.mp3" /* Nuevo */
            }
        },
        "titulo": {
            texto: "Para lograr una alimentaci\u00f3n saludable debemos...",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1.mp3",
                "nombre": "training\/audios\/L1_P1.mp3",
                "loaded": "empty"
            }
        },
        "instruccion": {
            texto: "Lea y seleccione la respuesta correcta",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1.mp3",
                "nombre": "training\/audios\/L1_P1.mp3",
                "loaded": "empty"
            }
        },
        "texto": null,
        "imagen": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L1_3.png", "nombre": "training\/images\/L1_3.png", "loaded": "empty"},
        "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P3.mp3", "nombre": "training\/audios\/L1_P3.mp3", "loaded": "empty"},
        "fecha": "2016-06-28 15:16:33",
        "activo": "1",
        "padre": "0",
        "hijo": "0",
        "opciones": {
            "7": {
                "id": "7", "correcta": "1", "orden": "1", "fecha": "2016-06-28 16:07:29", "visible": "1", "texto": "A. Consumir los alimentos con los nutrientes y la energ\u00eda necesarios para estar sanos. ",
                "feedback": {
                    texto: "Los nutrientes son sustancias en los alimentos necesarios para el funcionamiento del cuerpo.",
                    audio: {
                        "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1_b.mp3",
                        "nombre": "training\/audios\/L1_P1_b.mp3",
                        "loaded": "empty"
                    }
                },
                "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P3_a.mp3", "nombre": "training\/audios\/L1_P3_a.mp3", "loaded": "empty"}},
            "8": {
                "id": "8", "correcta": "0", "orden": "2", "fecha": "2016-06-28 16:07:30", "visible": "1", "texto": "B. Comer s\u00f3lo grasas y az\u00facares para tener energ\u00eda y estar activos. ",
                "feedback": {
                    texto: "La alimentaci\u00f3n es una actividad en la que consumimos alimentos como frutas, verduras y otros. ",
                    audio: {
                        "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1_b.mp3",
                        "nombre": "training\/audios\/L1_P1_b.mp3",
                        "loaded": "empty"
                    }
                },
                "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P3_b.mp3", "nombre": "training\/audios\/L1_P3_b.mp3", "loaded": "empty"}},
            "9": {
                "id": "9", "correcta": "0", "orden": "3", "fecha": "2016-06-28 16:07:30", "visible": "1", "texto": "C. Comer grandes cantidades de comidas.",
                "feedback": {
                    texto: "La cantidad de comida es seg\u00fan la edad y necesidades de cada uno. ",
                    audio: {
                        "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1_b.mp3",
                        "nombre": "training\/audios\/L1_P1_b.mp3",
                        "loaded": "empty"
                    }
                },
                "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P3_c.mp3", "nombre": "training\/audios\/L1_P3_c.mp3", "loaded": "empty"}},
            "10": {
                "id": "10", "correcta": "1", "orden": "4", "fecha": "2016-06-28 16:07:30", "visible": "1", "texto": "D. Comer cantidades de comida acorde con la edad y necesidades individuales.",
                "feedback": {
                    texto: "Muy bien",
                    audio: {
                        "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1_b.mp3",
                        "nombre": "training\/audios\/L1_P1_b.mp3",
                        "loaded": "empty"
                    }
                },
                "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P3_d.mp3", "nombre": "training\/audios\/L1_P3_d.mp3", "loaded": "empty"}}},
        "completo": false
    },
    "4": {
        "id": "4",
        "tipo": {
            "id": "2",
            "nombre": "Formar Parejas",
            "alias": "tipo2",
            "descripcion": "Relacionar conceptos, im\u00e1genes, palabras agrupando en parejas.",
            "icono": "ico-unidad-tipo-2.png", /* Nuevo */
            "audio": {
                "nombre": "unidad-tipo-2.mp3" /* Nuevo */
            }
        },
        "titulo": {
            texto: "Los nutrientes estan en los alimentos que diariamente consumimos, se encuentran en:",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1.mp3",
                "nombre": "training\/audios\/L1_P1.mp3",
                "loaded": "empty"
            }
        },
        "instruccion": {
            texto: "Lea y forme parejas",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1.mp3",
                "nombre": "training\/audios\/L1_P1.mp3",
                "loaded": "empty"
            }
        },
        "texto": null,
        "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P2.mp3", "nombre": "training\/audios\/L2_P2.mp3", "loaded": "empty"},
        "fecha": "2016-07-11 21:13:32",
        "activo": "1",
        "padre": "0",
        "hijo": "0",
        "opciones": {
            "27": {"id": "27", "correcta": "1", "orden": "1", "fecha": "2016-07-11 21:39:55", "visible": "1", "texto": "Prote\u00edna", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P2_a1.mp3", "nombre": "training\/audios\/L2_P2_a1.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_2A.png", "nombre": "training\/images\/L2_2A.png", "loaded": "empty"}}, 
            "28": {"id": "28", "correcta": "1", "orden": "1", "fecha": "2016-07-11 21:39:55", "visible": "1", "texto": "carnes, visceras y granos secos contienen proteinas.", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P2_a2.mp3", "nombre": "training\/audios\/L2_P2_a2.mp3", "loaded": "empty"}},
            "29": {"id": "29", "correcta": "1", "orden": "2", "fecha": "2016-07-11 21:39:55", "visible": "1", "texto": "Carbohidratos\r ", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P2_b1.mp3", "nombre": "training\/audios\/L2_P2_b1.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_2B.png", "nombre": "training\/images\/L2_2B.png", "loaded": "empty"}},
            "30": {"id": "30", "correcta": "1", "orden": "2", "fecha": "2016-07-11 21:39:56", "visible": "1", "texto": "el arroz, la papa, la harina contienen carbohidratos", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P2_b2.mp3", "nombre": "training\/audios\/L2_P2_b2.mp3", "loaded": "empty"}},
            "31": {"id": "31", "correcta": "1", "orden": "3", "fecha": "2016-07-11 21:39:56", "visible": "1", "texto": "Grasas", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P2_c1.mp3", "nombre": "training\/audios\/L2_P2_c1.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_2C.png", "nombre": "training\/images\/L2_2C.png", "loaded": "empty"}},
            "32": {"id": "32", "correcta": "1", "orden": "3", "fecha": "2016-07-11 21:39:56", "visible": "1", "texto": "los aceites vegetales, el coco, el aguacate contienen grasas.", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P2_c2.mp3", "nombre": "training\/audios\/L2_P2_c2.mp3", "loaded": "empty"}},
            "33": {"id": "33", "correcta": "1", "orden": "4", "fecha": "2016-07-11 21:39:56", "visible": "1", "texto": "Vitaminas y Minerales", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P2_d1.mp3", "nombre": "training\/audios\/L2_P2_d1.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_2D.png", "nombre": "training\/images\/L2_2D.png", "loaded": "empty"}},
            "34": {"id": "34", "correcta": "1", "orden": "4", "fecha": "2016-07-11 21:39:56", "visible": "1", "texto": "las frutas y las verduras contienen vitaminas y minerales.", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P2_d2.mp3", "nombre": "training\/audios\/L2_P2_d2.mp3", "loaded": "empty"}}},
        "completo": false},
    "5": {
        "id": "5",
        "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."},
        "titulo": "Una alimentaci\u00f3n saludable debe ser:",
        "instruccion": "Seleccione todas las opciones verdaderas",
        "texto": null,
        "imagen": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L1_5.png", "nombre": "training\/images\/L1_5.png", "loaded": "empty"},
        "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P5.mp3", "nombre": "training\/audios\/L1_P5.mp3", "loaded": "empty"},
        "fecha": "2016-06-28 15:16:33",
        "activo": "1",
        "padre": "0",
        "hijo": "0",
        "opciones": {"15": {"id": "15", "correcta": "0", "orden": "1", "fecha": "2016-06-28 16:07:31", "visible": "1", "texto": "A. (Incompleta) Que contenga alimentos de un s\u00f3lo grupo. ", "feedback": "\"La alimentaci\u00f3 debe ser completa. \nSe requiere consumir alimentos de todos los grupos.\"", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P5_a.mp3", "nombre": "training\/audios\/L1_P5_a.mp3", "loaded": "empty"}}, "16": {"id": "16", "correcta": "1", "orden": "2", "fecha": "2016-06-28 16:07:31", "visible": "1", "texto": "B. (Equilibrada o balanceada) Que suministre la cantidad necesaria de todos los grupos de alimentos.", "feedback": "Es importante consumir alimentos de los diferentes grupos en cantidades necesarias.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P5_b.mp3", "nombre": "training\/audios\/L1_P5_b.mp3", "loaded": "empty"}}, "17": {"id": "17", "correcta": "1", "orden": "3", "fecha": "2016-06-28 16:07:31", "visible": "1", "texto": "C. (Suficiente) Que cubra los requerimientos y necesidades de la persona. ", "feedback": "Los alimentos consumidos cubren las necesidades de  cada persona.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P5_c.mp3", "nombre": "training\/audios\/L1_P5_c.mp3", "loaded": "empty"}}, "18": {"id": "18", "correcta": "1", "orden": "4", "fecha": "2016-06-28 16:07:32", "visible": "1", "texto": "D. (Adecuada) De acuerdo a las caracter\u00edsticas de la persona (edad, sexo, estado de salud, etc.) y sus costumbres. ", "feedback": "La alimentaci\u00f3n de ni\u00f1os y adultos o mujeres embarazadas es diferente.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P5_d.mp3", "nombre": "training\/audios\/L1_P5_d.mp3", "loaded": "empty"}}},
        "completo": false
    },
    "6": {
        "id": "6",
        "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."},
        "titulo": "Podemos lograr una alimentaci\u00f3n saludable y variada cuando \u2026",
        "instruccion": "Lea y selecciones solo los aspectos positivos",
        "texto": null,
        "imagen": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L1_6.png", "nombre": "training\/images\/L1_6.png", "loaded": "empty"},
        "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P6.mp3", "nombre": "training\/audios\/L1_P6.mp3", "loaded": "empty"},
        "fecha": "2016-06-28 15:18:57",
        "activo": "1",
        "padre": "0",
        "hijo": "0",
        "opciones": {"19": {"id": "19", "correcta": "1", "orden": "1", "fecha": "2016-06-28 16:07:29", "visible": "1", "texto": "A. Consumimos alimentos frescos y nutritivos.", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P6_a.mp3", "nombre": "training\/audios\/L1_P6_a.mp3", "loaded": "empty"}}, "20": {"id": "20", "correcta": "1", "orden": "2", "fecha": "2016-06-28 16:07:29", "visible": "1", "texto": "B. Consumimos alimentos seg\u00fan la edad, actividad diaria y costumbres.", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P6_b.mp3", "nombre": "training\/audios\/L1_P6_b.mp3", "loaded": "empty"}}, "21": {"id": "21", "correcta": "0", "orden": "3", "fecha": "2016-07-11 16:27:43", "visible": "1", "texto": "C. Consumimos alimentos muy dulces. ", "feedback": "Para lograr una alimentaci\u00f3n saludable se debe evitar comer dulces y alimentos en exceso.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P6_d.mp3", "nombre": "training\/audios\/L1_P6_d.mp3", "loaded": "empty"}}, "22": {"id": "22", "correcta": "0", "orden": "4", "fecha": "2016-07-11 16:27:43", "visible": "1", "texto": "D. Consumimos los mismos alimentos diariamente.", "feedback": "Una alimentaci\u00f3n saludable debe proporcionar variedad de sabores y colores. ", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P6_e.mp3", "nombre": "training\/audios\/L1_P6_e.mp3", "loaded": "empty"}}},
        "completo": false
    },
    "7": {
        "id": "7",
        "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."},
        "titulo": "Los alimentos contienen sustancias llamadas nutrientes que sirven para ...",
        "instruccion": "Lea y seleccione las respuestas correctas",
        "texto": null,
        "imagen": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_1.png", "nombre": "training\/images\/L2_1.png", "loaded": "empty"},
        "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P1.mp3", "nombre": "training\/audios\/L2_P1.mp3", "loaded": "empty"},
        "fecha": "2016-07-11 21:13:32",
        "activo": "1",
        "padre": "0",
        "hijo": "0",
        "opciones": {"23": {"id": "23", "correcta": "1", "orden": "1", "fecha": "2016-07-11 21:39:54", "visible": "1", "texto": "A. Crecer", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P1_a.mp3", "nombre": "training\/audios\/L2_P1_a.mp3", "loaded": "empty"}}, "24": {"id": "24", "correcta": "1", "orden": "2", "fecha": "2016-07-11 21:39:54", "visible": "1", "texto": "B. Estar sanos.", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P1_b.mp3", "nombre": "training\/audios\/L2_P1_b.mp3", "loaded": "empty"}}, "25": {"id": "25", "correcta": "0", "orden": "3", "fecha": "2016-07-11 21:39:55", "visible": "1", "texto": "C. Estar enfermos.", "feedback": "Los nutrientes son necesarios para que el cuerpo funcione. De esta manera podemos evitar enfermedades.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P1_c.mp3", "nombre": "training\/audios\/L2_P1_c.mp3", "loaded": "empty"}}, "26": {"id": "26", "correcta": "1", "orden": "4", "fecha": "2016-07-11 21:39:55", "visible": "1", "texto": "D. Tener energ\u00eda", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P1_d.mp3", "nombre": "training\/audios\/L2_P1_d.mp3", "loaded": "empty"}}},
        "completo": false
    },
    "8": {
        "id": "8",
        "tipo": {
            "id": "2",
            "nombre": "Formar Parejas",
            "alias": "tipo2",
            "descripcion": "Relacionar conceptos, im\u00e1genes, palabras agrupando en parejas.",
            "icono": "ico-unidad-tipo-2.png", /* Nuevo */
            "audio": {
                "nombre": "unidad-tipo-2.mp3" /* Nuevo */
            }
        },
        "titulo": {
            texto: "Los nutrientes estan en los alimentos que diariamente consumimos, se encuentran en:",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1.mp3",
                "nombre": "training\/audios\/L1_P1.mp3",
                "loaded": "empty"
            }
        },
        "instruccion": {
            texto: "Lea y forme parejas",
            "audio": {
                "url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L1_P1.mp3",
                "nombre": "training\/audios\/L1_P1.mp3",
                "loaded": "empty"
            }
        },
        "texto": null,
        "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P2.mp3", "nombre": "training\/audios\/L2_P2.mp3", "loaded": "empty"},
        "fecha": "2016-07-11 21:13:32",
        "activo": "1",
        "padre": "0",
        "hijo": "0",
        "opciones": {"27": {"id": "27", "correcta": "1", "orden": "1", "fecha": "2016-07-11 21:39:55", "visible": "1", "texto": "Prote\u00edna", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P2_a1.mp3", "nombre": "training\/audios\/L2_P2_a1.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_2A.png", "nombre": "training\/images\/L2_2A.png", "loaded": "empty"}}, "28": {"id": "28", "correcta": "1", "orden": "1", "fecha": "2016-07-11 21:39:55", "visible": "1", "texto": "Crean anticuerpos, producen enzimas y forman los m\u00fasculos del cuerpo.Se encuentran en alimentos de origen animal y granos secos como la lenteja, frijol.", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P2_a2.mp3", "nombre": "training\/audios\/L2_P2_a2.mp3", "loaded": "empty"}}, "29": {"id": "29", "correcta": "1", "orden": "2", "fecha": "2016-07-11 21:39:55", "visible": "1", "texto": "Carbohidratos\r ", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P2_b1.mp3", "nombre": "training\/audios\/L2_P2_b1.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_2B.png", "nombre": "training\/images\/L2_2B.png", "loaded": "empty"}}, "30": {"id": "30", "correcta": "1", "orden": "2", "fecha": "2016-07-11 21:39:56", "visible": "1", "texto": "Sustancias que dan energ\u00eda al cuerpo. Se encuentran principalmente en cereales, ra\u00edces y tub\u00e9rculos.", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P2_b2.mp3", "nombre": "training\/audios\/L2_P2_b2.mp3", "loaded": "empty"}}, "31": {"id": "31", "correcta": "1", "orden": "3", "fecha": "2016-07-11 21:39:56", "visible": "1", "texto": "Grasas", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P2_c1.mp3", "nombre": "training\/audios\/L2_P2_c1.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_2C.png", "nombre": "training\/images\/L2_2C.png", "loaded": "empty"}}, "32": {"id": "32", "correcta": "1", "orden": "3", "fecha": "2016-07-11 21:39:56", "visible": "1", "texto": "Las grasas aportan el doble energ\u00eda que  los  cabohidratos. Se requieren en peque\u00f1a cantidad, ayudan que el cuerpo aproveche otros nutrientes, como las vitaminas.", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P2_c2.mp3", "nombre": "training\/audios\/L2_P2_c2.mp3", "loaded": "empty"}}, "33": {"id": "33", "correcta": "1", "orden": "4", "fecha": "2016-07-11 21:39:56", "visible": "1", "texto": "Vitaminas", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P2_d1.mp3", "nombre": "training\/audios\/L2_P2_d1.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_2D.png", "nombre": "training\/images\/L2_2D.png", "loaded": "empty"}}, "34": {"id": "34", "correcta": "1", "orden": "4", "fecha": "2016-07-11 21:39:56", "visible": "1", "texto": "Estan principalmente en frutas y verduras; su bajo consumo puede causar enfermedades como  la anemia.", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P2_d2.mp3", "nombre": "training\/audios\/L2_P2_d2.mp3", "loaded": "empty"}}},
        "completo": false
    },
    "9": {
        "id": "9",
        "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."},
        "titulo": "Las prote\u00ednas forman, reparan y mantienen el cuerpo. Se encuentran en alimentos de origen animal o sus derivados. Las podemos encontrar en: ",
        "instruccion": "Lea y seleccione las opciones correctas",
        "texto": null,
        "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P3.mp3", "nombre": "training\/audios\/L2_P3.mp3", "loaded": "empty"},
        "fecha": "2016-07-11 21:13:32",
        "activo": "1",
        "padre": "0",
        "hijo": "0",
        "opciones": {"35": {"id": "35", "correcta": "0", "orden": "1", "fecha": "2016-07-11 21:39:56", "visible": "1", "texto": "A. La naranja", "feedback": "La naranja es una fruta, que aporta principalmente vitaminas.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P3_a.mp3", "nombre": "training\/audios\/L2_P3_a.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_3A.png", "nombre": "training\/images\/L2_3A.png", "loaded": "empty"}}, "36": {"id": "36", "correcta": "1", "orden": "2", "fecha": "2016-07-11 21:39:57", "visible": "1", "texto": "B. L\u00e1cteos", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P3_b.mp3", "nombre": "training\/audios\/L2_P3_b.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_3B.png", "nombre": "training\/images\/L2_3B.png", "loaded": "empty"}}, "37": {"id": "37", "correcta": "0", "orden": "3", "fecha": "2016-07-11 21:39:57", "visible": "1", "texto": "C. Yuca", "feedback": "La yuca es de origen vegetal y aporta carbohidratos.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P3_c.mp3", "nombre": "training\/audios\/L2_P3_c.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_3C.png", "nombre": "training\/images\/L2_3C.png", "loaded": "empty"}}, "38": {"id": "38", "correcta": "1", "orden": "4", "fecha": "2016-07-11 21:39:57", "visible": "1", "texto": "D. Carne", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P3_d.mp3", "nombre": "training\/audios\/L2_P3_d.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_3D.png", "nombre": "training\/images\/L2_3D.png", "loaded": "empty"}}},
        "completo": false
    },
    "10": {
        "id": "10",
        "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."},
        "titulo": "Los carbohidratos dan energ\u00eda contribuyen a la estructura del cuerpo. S\u00ed se consumen en gran cantidad pueden llevar al sobrepeso. Los encontramos en:  ",
        "instruccion": "Seleccione todas las opciones verdaderas",
        "texto": null,
        "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P4.mp3", "nombre": "training\/audios\/L2_P4.mp3", "loaded": "empty"},
        "fecha": "2016-07-11 21:13:33",
        "activo": "1",
        "padre": "0",
        "hijo": "0",
        "opciones": {"39": {"id": "39", "correcta": "0", "orden": "1", "fecha": "2016-07-11 21:39:57", "visible": "1", "texto": "A. Carne", "feedback": "Falso. La carne aporta principalmente prote\u00ednas.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P4_a.mp3", "nombre": "training\/audios\/L2_P4_a.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_4A.png", "nombre": "training\/images\/L2_4A.png", "loaded": "empty"}}, "40": {"id": "40", "correcta": "1", "orden": "2", "fecha": "2016-07-11 21:39:57", "visible": "1", "texto": "B. Pasta", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P4_b.mp3", "nombre": "training\/audios\/L2_P4_b.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_4B.png", "nombre": "training\/images\/L2_4B.png", "loaded": "empty"}}, "41": {"id": "41", "correcta": "0", "orden": "3", "fecha": "2016-07-11 21:39:57", "visible": "1", "texto": "C. Queso", "feedback": "Falso. El queso aporta principalmente prote\u00ednas.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P4_c.mp3", "nombre": "training\/audios\/L2_P4_c.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_4C.png", "nombre": "training\/images\/L2_4C.png", "loaded": "empty"}}, "42": {"id": "42", "correcta": "1", "orden": "4", "fecha": "2016-07-11 21:39:58", "visible": "1", "texto": "D. Pl\u00e1tano", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P4_d.mp3", "nombre": "training\/audios\/L2_P4_d.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_4D.png", "nombre": "training\/images\/L2_4D.png", "loaded": "empty"}}},
        "completo": false
    },
    "11": {
        "id": "11",
        "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."},
        "titulo": "Las grasas proporcionan energ\u00eda y ayudan al cuerpo a:",
        "instruccion": "Lea y seleccione las respuestas correctas.",
        "texto": null,
        "imagen": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_5.png", "nombre": "training\/images\/L2_5.png", "loaded": "empty"},
        "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P5.mp3", "nombre": "training\/audios\/L2_P5.mp3", "loaded": "empty"},
        "fecha": "2016-07-11 21:13:33",
        "activo": "1",
        "padre": "0",
        "hijo": "0",
        "opciones": {"43": {"id": "43", "correcta": "0", "orden": "1", "fecha": "2016-07-11 21:39:58", "visible": "1", "texto": "A. proteger los \u00f3rganos del cuerpo como el h\u00edgado y ri\u00f1ones de golpes y lesiones.", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P5_a.mp3", "nombre": "training\/audios\/L2_P5_a.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_5.png", "nombre": "training\/images\/L2_5.png", "loaded": "empty"}}, "44": {"id": "44", "correcta": "1", "orden": "2", "fecha": "2016-07-11 21:39:58", "visible": "1", "texto": "B. ayudar a bajar de peso", "feedback": "Las grasas ayudan a proteger el cuerpo, se requieren en poca cantidad porque aportan el doble de energ\u00eda y pueden llevar al sobrepeso. ", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P5_b.mp3", "nombre": "training\/audios\/L2_P5_b.mp3", "loaded": "empty"}}, "45": {"id": "45", "correcta": "0", "orden": "3", "fecha": "2016-07-11 21:39:58", "visible": "1", "texto": "C. absorber y retener los sabores de los alimentos.", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P5_c.mp3", "nombre": "training\/audios\/L2_P5_c.mp3", "loaded": "empty"}}, "46": {"id": "46", "correcta": "0", "orden": "4", "fecha": "2016-07-11 21:39:58", "visible": "1", "texto": "D. transportar y absorber algunas vitaminas en la sangre.", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P5_d.mp3", "nombre": "training\/audios\/L2_P5_d.mp3", "loaded": "empty"}}},
        "completo": false
    },
    "12": {
        "id": "12",
        "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."},
        "titulo": "Las vitaminas y minerales son sustancias que el cuerpo no produce y necesita, se encuentran principalmente en:  ",
        "instruccion": "Lea y seleccione las respuestas correctas.",
        "texto": null,
        "imagen": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_6.png", "nombre": "training\/images\/L2_6.png", "loaded": "empty"},
        "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P6.mp3", "nombre": "training\/audios\/L2_P6.mp3", "loaded": "empty"},
        "fecha": "2016-07-11 21:13:33",
        "activo": "1",
        "padre": "0",
        "hijo": "0",
        "opciones": {"47": {"id": "47", "correcta": "1", "orden": "1", "fecha": "2016-07-11 21:39:59", "visible": "1", "texto": "A. Frutas", "feedback": "\u00a1Muy bien! Las frutas contienen diferentes cantidades de vitaminas.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P6_a.mp3", "nombre": "training\/audios\/L2_P6_a.mp3", "loaded": "empty"}}, "48": {"id": "48", "correcta": "0", "orden": "2", "fecha": "2016-07-11 21:39:59", "visible": "1", "texto": "B. Carne", "feedback": "Las carnes contienen principalmente prote\u00ednas y algunas vitaminas y minerales.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P6_b.mp3", "nombre": "training\/audios\/L2_P6_b.mp3", "loaded": "empty"}}, "49": {"id": "49", "correcta": "0", "orden": "3", "fecha": "2016-07-11 21:39:59", "visible": "1", "texto": "C. L\u00e1cteos", "feedback": "Los l\u00e1cteos y huevos aportan principalmente prote\u00ednas, tambien contienen algunas vitaminas y minerales", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P6_c.mp3", "nombre": "training\/audios\/L2_P6_c.mp3", "loaded": "empty"}}, "50": {"id": "50", "correcta": "1", "orden": "4", "fecha": "2016-07-11 21:39:59", "visible": "1", "texto": "D. Verduras", "feedback": "\u00a1Muy bien! Los vegetales contienen vitaminas y minerales.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P6_d.mp3", "nombre": "training\/audios\/L2_P6_d.mp3", "loaded": "empty"}}},
        "completo": false
    },
    "13": {
        "id": "13",
        "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."},
        "titulo": "Consumir grasas ben\u00e9ficas nos ayuda a tener un coraz\u00f3n saludable. Sigamos estas pr\u00e1cticas: ",
        "instruccion": "Lea y seleccione las respuestas incorrectas.",
        "texto": null,
        "imagen": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_7.png", "nombre": "training\/images\/L2_7.png", "loaded": "empty"},
        "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P7.mp3", "nombre": "training\/audios\/L2_P7.mp3", "loaded": "empty"},
        "fecha": "2016-07-11 21:13:33",
        "activo": "1",
        "padre": "0",
        "hijo": "0",
        "opciones": {"51": {"id": "51", "correcta": "1", "orden": "1", "fecha": "2016-07-11 21:39:59", "visible": "1", "texto": "A. Usar aceites vegetales de un s\u00f3lo ingrediente.", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P7_a.mp3", "nombre": "training\/audios\/L2_P7_a.mp3", "loaded": "empty"}}, "52": {"id": "52", "correcta": "0", "orden": "2", "fecha": "2016-07-11 21:39:59", "visible": "1", "texto": "B. Consumir  alimentos fritos.", "feedback": "Los alimentos fritos contienen altos niveles de grasas que afectan al coraz\u00f3n y llevan al sobrepeso.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P7_b.mp3", "nombre": "training\/audios\/L2_P7_b.mp3", "loaded": "empty"}}, "53": {"id": "53", "correcta": "1", "orden": "3", "fecha": "2016-07-11 21:40:00", "visible": "1", "texto": "C. Evitar el uso de manteca y mantequilla.", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P7_c.mp3", "nombre": "training\/audios\/L2_P7_c.mp3", "loaded": "empty"}}, "54": {"id": "54", "correcta": "0", "orden": "4", "fecha": "2016-07-11 21:40:00", "visible": "1", "texto": "D. Comer galletas, helados y comidas en paquetes. ", "feedback": "Las galletas, helados y comida en paquetes contienen  grasas perjudiciales en exceso afectan la salud.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P7_d.mp3", "nombre": "training\/audios\/L2_P7_d.mp3", "loaded": "empty"}}},
        "completo": false
    },
    "15": {
        "id": "15",
        "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."},
        "titulo": "El cuerpo humano est\u00e1 conformado en un 60% de agua. Esta nos sirve en el organismo para\u2026",
        "instruccion": "Lea y seleccione las respuestas correctas.",
        "texto": null,
        "imagen": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L2_9.png", "nombre": "training\/images\/L2_9.png", "loaded": "empty"},
        "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P9.mp3", "nombre": "training\/audios\/L2_P9.mp3", "loaded": "empty"},
        "fecha": "2016-07-11 21:13:33",
        "activo": "1",
        "padre": "0",
        "hijo": "0",
        "opciones": {"59": {"id": "59", "correcta": "1", "orden": "1", "fecha": "2016-07-11 21:40:01", "visible": "1", "texto": "A. digerir los alimentos", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P9_a.mp3", "nombre": "training\/audios\/L2_P9_a.mp3", "loaded": "empty"}}, "60": {"id": "60", "correcta": "1", "orden": "2", "fecha": "2016-07-11 21:40:01", "visible": "1", "texto": "B. eliminar desechos del organismo", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P9_b.mp3", "nombre": "training\/audios\/L2_P9_b.mp3", "loaded": "empty"}}, "61": {"id": "61", "correcta": "1", "orden": "3", "fecha": "2016-07-11 21:40:01", "visible": "1", "texto": "C. sudar, salivar y producir sangre", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P9_c.mp3", "nombre": "training\/audios\/L2_P9_c.mp3", "loaded": "empty"}}, "62": {"id": "62", "correcta": "0", "orden": "4", "fecha": "2016-07-11 21:40:01", "visible": "1", "texto": "D. lavar el est\u00f3mago del ser humano", "feedback": "El agua ayuda a regular y digerir los alimentos y producir l\u00edquidos en el organismo. .", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L2_P9_d.mp3", "nombre": "training\/audios\/L2_P9_d.mp3", "loaded": "empty"}}},
        "completo": false
    },
    "16": {
        "id": "16",
        "tipo": {"id": "4", "nombre": "Unica Respuesta", "alias": "tipo4", "descripcion": "Lea y seleccione la respuesta correcta."},
        "titulo": "Este alimento no es fuente de proteina.",
        "instruccion": "Lea y seleccione la respuesta incorrecta.",
        "texto": null,
        "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P1.mp3", "nombre": "training\/audios\/L3_P1.mp3", "loaded": "empty"},
        "fecha": "2016-07-11 22:50:58",
        "activo": "1",
        "padre": "0",
        "hijo": "0",
        "opciones": {"63": {"id": "63", "correcta": "0", "orden": "1", "fecha": "2016-07-11 23:23:12", "visible": "1", "texto": "A. Huevos ", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P1_a.mp3", "nombre": "training\/audios\/L3_P1_a.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_1A.png", "nombre": "training\/images\/L3_1A.png", "loaded": "empty"}}, "64": {"id": "64", "correcta": "0", "orden": "2", "fecha": "2016-07-11 23:23:12", "visible": "1", "texto": "B. Pescado", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P1_b.mp3", "nombre": "training\/audios\/L3_P1_b.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_1B.png", "nombre": "training\/images\/L3_1B.png", "loaded": "empty"}}, "65": {"id": "65", "correcta": "1", "orden": "3", "fecha": "2016-07-11 23:23:12", "visible": "1", "texto": "C. Br\u00f3coli", "feedback": "El br\u00f3coli es un vegetal. Su consumo debe ser frecuente. ", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P1_c.mp3", "nombre": "training\/audios\/L3_P1_c.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_1C.png", "nombre": "training\/images\/L3_1C.png", "loaded": "empty"}}, "66": {"id": "66", "correcta": "0", "orden": "4", "fecha": "2016-07-11 23:23:13", "visible": "1", "texto": "D. Frijol", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P1_d.mp3", "nombre": "training\/audios\/L3_P1_d.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_1D.png", "nombre": "training\/images\/L3_1D.png", "loaded": "empty"}}},
        "completo": false
    },
    "17": {
        "id": "17",
        "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."},
        "titulo": "Los productos lactetos aportan gran cantidad de porteinas y minerales como calcio, f\u00f3sforo y magnesio. Qu\u00e9 alimentos pertencen al grupo de los l\u00e1cteos: ",
        "instruccion": "Lea y seleccione las respuestas correctas",
        "texto": null,
        "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P2.mp3", "nombre": "training\/audios\/L3_P2.mp3", "loaded": "empty"},
        "fecha": "2016-07-11 22:50:58",
        "activo": "1",
        "padre": "0",
        "hijo": "0",
        "opciones": {"67": {"id": "67", "correcta": "1", "orden": "1", "fecha": "2016-07-11 23:23:13", "visible": "1", "texto": "A. Leche", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P2_a.mp3", "nombre": "training\/audios\/L3_P2_a.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_2A.png", "nombre": "training\/images\/L3_2A.png", "loaded": "empty"}}, "68": {"id": "68", "correcta": "1", "orden": "2", "fecha": "2016-07-11 23:23:13", "visible": "1", "texto": "B. Queso ", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P2_b.mp3", "nombre": "training\/audios\/L3_P2_b.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_2B.png", "nombre": "training\/images\/L3_2B.png", "loaded": "empty"}}, "69": {"id": "69", "correcta": "0", "orden": "3", "fecha": "2016-07-11 23:23:13", "visible": "1", "texto": "C. Arroz", "feedback": "El arroz pertenece a otro grupo. No es un l\u00e1cteo. ", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P2_c.mp3", "nombre": "training\/audios\/L3_P2_c.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_2C.png", "nombre": "training\/images\/L3_2C.png", "loaded": "empty"}}, "70": {"id": "70", "correcta": "1", "orden": "4", "fecha": "2016-07-11 23:23:13", "visible": "1", "texto": "D. Yogurt", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P2_d.mp3", "nombre": "training\/audios\/L3_P2_d.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_2D.png", "nombre": "training\/images\/L3_2D.png", "loaded": "empty"}}},
        "completo": false
    },
    "18": {
        "id": "18",
        "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."},
        "titulo": "El grupo de cereales, ra\u00edces y tub\u00e9rculos es rico en carbohidratos o harinas. Dan energ\u00eda al organismo. \u00bfQu\u00e9 alimentos hacen parte de este grupo?: ",
        "instruccion": "Lea y seleccione las opciones correctas",
        "texto": null,
        "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P3.mp3", "nombre": "training\/audios\/L3_P3.mp3", "loaded": "empty"},
        "fecha": "2016-07-11 22:50:59",
        "activo": "1",
        "padre": "0",
        "hijo": "0",
        "opciones": {"71": {"id": "71", "correcta": "1", "orden": "1", "fecha": "2016-07-11 23:23:14", "visible": "1", "texto": "A. Yuca", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P3_a.mp3", "nombre": "training\/audios\/L3_P3_a.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_3A.png", "nombre": "training\/images\/L3_3A.png", "loaded": "empty"}}, "72": {"id": "72", "correcta": "0", "orden": "2", "fecha": "2016-07-11 23:23:14", "visible": "1", "texto": "B. Mango", "feedback": "El mango es una fruta y aporta principalmente vitaminas.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P3_b.mp3", "nombre": "training\/audios\/L3_P3_b.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_3B.png", "nombre": "training\/images\/L3_3B.png", "loaded": "empty"}}, "73": {"id": "73", "correcta": "1", "orden": "3", "fecha": "2016-07-11 23:23:14", "visible": "1", "texto": "C. Pl\u00e1tano", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P3_c.mp3", "nombre": "training\/audios\/L3_P3_c.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_3C.png", "nombre": "training\/images\/L3_3C.png", "loaded": "empty"}}},
        "completo": false
    },
    "19": {"id": "19", "tipo": {"id": "4", "nombre": "Unica Respuesta", "alias": "tipo4", "descripcion": "Lea y seleccione la respuesta correcta."}, "titulo": "El grupo de frutas y verduras es rico en vitaminas, minerales y fibra. \u00bfQu\u00e9 alimentos hacen parte de este grupo? ", "instruccion": "Lea y seleccione la respuesta incorrecta", "texto": null, "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P4.mp3", "nombre": "training\/audios\/L3_P4.mp3", "loaded": "empty"}, "fecha": "2016-07-11 22:50:59", "activo": "1", "padre": "0", "hijo": "0", "opciones": {"74": {"id": "74", "correcta": "0", "orden": "1", "fecha": "2016-07-11 23:23:14", "visible": "1", "texto": "A. Ahuyama", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P4_a.mp3", "nombre": "training\/audios\/L3_P4_a.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_4A.png", "nombre": "training\/images\/L3_4A.png", "loaded": "empty"}}, "75": {"id": "75", "correcta": "0", "orden": "2", "fecha": "2016-07-11 23:23:15", "visible": "1", "texto": "B. Naranja ", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P4_b.mp3", "nombre": "training\/audios\/L3_P4_b.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_4B.png", "nombre": "training\/images\/L3_4B.png", "loaded": "empty"}}, "76": {"id": "76", "correcta": "1", "orden": "3", "fecha": "2016-07-11 23:23:15", "visible": "1", "texto": "C. Lentejas", "feedback": "Las lentejas pertenecen al grupo de carnes, huevos y leguminosas o granos secos que aporta principalmente prote\u00edna.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P4_c.mp3", "nombre": "training\/audios\/L3_P4_c.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_4C.png", "nombre": "training\/images\/L3_4C.png", "loaded": "empty"}}, "77": {"id": "77", "correcta": "0", "orden": "4", "fecha": "2016-07-11 23:23:15", "visible": "1", "texto": "D. Tomate", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P4_d.mp3", "nombre": "training\/audios\/L3_P4_d.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_4D.png", "nombre": "training\/images\/L3_4D.png", "loaded": "empty"}}}, "completo": false},
    "20": {"id": "20", "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."}, "titulo": "Las grasas proviene de vegetales y animales, dan energ\u00eda y calor\u00edas al organismo. En exceso lleva al sobrepeso. Estos alimentos son ricos en grasas...", "instruccion": "Lea y seleccione las respuesta correctas.", "texto": null, "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P5.mp3", "nombre": "training\/audios\/L3_P5.mp3", "loaded": "empty"}, "fecha": "2016-07-11 22:50:59", "activo": "1", "padre": "0", "hijo": "0", "opciones": {"78": {"id": "78", "correcta": "0", "orden": "1", "fecha": "2016-07-11 23:23:15", "visible": "1", "texto": "A. Manzana", "feedback": "La manzana pertenece al grupo de frutas y verduras  rico en vitaminas y minerales. ", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P5_a.mp3", "nombre": "training\/audios\/L3_P5_a.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_5A.png", "nombre": "training\/images\/L3_5A.png", "loaded": "empty"}}, "79": {"id": "79", "correcta": "1", "orden": "2", "fecha": "2016-07-11 23:23:15", "visible": "1", "texto": "B. Coco", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P5_b.mp3", "nombre": "training\/audios\/L3_P5_b.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_5B.png", "nombre": "training\/images\/L3_5B.png", "loaded": "empty"}}, "80": {"id": "80", "correcta": "1", "orden": "3", "fecha": "2016-07-11 23:23:16", "visible": "1", "texto": "C. Frituras", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P5_c.mp3", "nombre": "training\/audios\/L3_P5_c.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_5C.png", "nombre": "training\/images\/L3_5C.png", "loaded": "empty"}}, "81": {"id": "81", "correcta": "1", "orden": "4", "fecha": "2016-07-11 23:23:16", "visible": "1", "texto": "D. Frutos secos ", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P5_d.mp3", "nombre": "training\/audios\/L3_P5_d.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_5D.png", "nombre": "training\/images\/L3_5D.png", "loaded": "empty"}}}, "completo": false},
    "21": {"id": "21", "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."}, "titulo": "El grupo de az\u00facares da energ\u00eda y calor\u00edas para el funcionamiento de los m\u00fasculos y tejidos. En exceso producen sobrepeso, diabetes y caries dental. Este alimento no pertenece al grupo de los azucares:", "instruccion": "Lea y seleccione las respuestas correctas.", "texto": null, "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P6.mp3", "nombre": "training\/audios\/L3_P6.mp3", "loaded": "empty"}, "fecha": "2016-07-11 22:50:59", "activo": "1", "padre": "0", "hijo": "0", "opciones": {"82": {"id": "82", "correcta": "0", "orden": "1", "fecha": "2016-07-11 23:23:16", "visible": "1", "texto": "A. Miel ", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P6_a.mp3", "nombre": "training\/audios\/L3_P6_a.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_6A.png", "nombre": "training\/images\/L3_6A.png", "loaded": "empty"}}, "83": {"id": "83", "correcta": "1", "orden": "2", "fecha": "2016-07-11 23:23:16", "visible": "1", "texto": "B. Pescado", "feedback": "Recuerde. El pescado es rico en prote\u00ednas.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P6_b.mp3", "nombre": "training\/audios\/L3_P6_b.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_6B.png", "nombre": "training\/images\/L3_6B.png", "loaded": "empty"}}, "84": {"id": "84", "correcta": "0", "orden": "3", "fecha": "2016-07-11 23:23:16", "visible": "1", "texto": "C. Panela ", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P6_c.mp3", "nombre": "training\/audios\/L3_P6_c.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_6C.png", "nombre": "training\/images\/L3_6C.png", "loaded": "empty"}}, "85": {"id": "85", "correcta": "0", "orden": "4", "fecha": "2016-07-11 23:23:17", "visible": "1", "texto": "D. Az\u00facar ", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L3_P6_d.mp3", "nombre": "training\/audios\/L3_P6_d.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L3_6D.png", "nombre": "training\/images\/L3_6D.png", "loaded": "empty"}}}, "completo": false},
    "22": {"id": "22", "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."}, "titulo": "Los alimentos de color naranja y amarillo ayudan a la buena visi\u00f3n, la piel y defensas. Son ricos en vitamina A y vitamina C. Se encuentran en frutas y verduras, como las siguientes:", "instruccion": "Lea y seleccione las respuestas correctas.", "texto": null, "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P1.mp3", "nombre": "training\/audios\/L4_P1.mp3", "loaded": "empty"}, "fecha": "2016-07-11 22:54:33", "activo": "1", "padre": "0", "hijo": "0", "opciones": {"86": {"id": "86", "correcta": "1", "orden": "1", "fecha": "2016-07-11 23:23:17", "visible": "1", "texto": "A. Zanahoria", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P1_a.mp3", "nombre": "training\/audios\/L4_P1_a.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_1A.png", "nombre": "training\/images\/L4_1A.png", "loaded": "empty"}}, "87": {"id": "87", "correcta": "1", "orden": "2", "fecha": "2016-07-11 23:23:17", "visible": "1", "texto": "B. Naranja", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P1_b.mp3", "nombre": "training\/audios\/L4_P1_b.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_1B.png", "nombre": "training\/images\/L4_1B.png", "loaded": "empty"}}, "88": {"id": "88", "correcta": "1", "orden": "3", "fecha": "2016-07-11 23:23:17", "visible": "1", "texto": "C. Pl\u00e1tano verde", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P1_c.mp3", "nombre": "training\/audios\/L4_P1_c.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_1C.png", "nombre": "training\/images\/L4_1C.png", "loaded": "empty"}}, "89": {"id": "89", "correcta": "0", "orden": "4", "fecha": "2016-07-11 23:23:17", "visible": "1", "texto": "D. Huevo", "feedback": "Los huevos amarillos son ricos en prote\u00ednas y minerales como el calcio, f\u00f3sforo y magnesio.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P1_d.mp3", "nombre": "training\/audios\/L4_P1_d.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_1D.png", "nombre": "training\/images\/L4_1D.png", "loaded": "empty"}}}, "completo": false},
    "23": {"id": "23", "tipo": {"id": "4", "nombre": "Unica Respuesta", "alias": "tipo4", "descripcion": "Lea y seleccione la respuesta correcta."}, "titulo": "Los alimentos verdes ayudan a la digesti\u00f3n y nutrici\u00f3n saludable. Contienen vitaminas C, K y \u00e1cido f\u00f3lico; tambi\u00e9n minerales como hierro y potasio. Previenen la anemia y reduce malformaciones fetales.", "instruccion": "Lea y seleccione las respuestas correctas", "texto": null, "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P2.mp3", "nombre": "training\/audios\/L4_P2.mp3", "loaded": "empty"}, "fecha": "2016-07-11 22:54:34", "activo": "1", "padre": "0", "hijo": "0", "opciones": {"90": {"id": "90", "correcta": "0", "orden": "1", "fecha": "2016-07-11 23:23:18", "visible": "1", "texto": "A. Espinaca", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P2_a.mp3", "nombre": "training\/audios\/L4_P2_a.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_2A.png", "nombre": "training\/images\/L4_2A.png", "loaded": "empty"}}, "91": {"id": "91", "correcta": "1", "orden": "2", "fecha": "2016-07-11 23:23:18", "visible": "1", "texto": "B. Cebolla larga", "feedback": "La cebolla larga es una ra\u00edz blanca y su tallo es verde, aporta calor\u00edas y fibra.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P2_b.mp3", "nombre": "training\/audios\/L4_P2_b.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_2B.png", "nombre": "training\/images\/L4_2B.png", "loaded": "empty"}}, "92": {"id": "92", "correcta": "0", "orden": "3", "fecha": "2016-07-11 23:23:19", "visible": "1", "texto": "C. Kiwi", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P2_c.mp3", "nombre": "training\/audios\/L4_P2_c.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_2C.png", "nombre": "training\/images\/L4_2C.png", "loaded": "empty"}}, "93": {"id": "93", "correcta": "0", "orden": "4", "fecha": "2016-07-11 23:23:19", "visible": "1", "texto": "D. Habichuela ", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P2_d.mp3", "nombre": "training\/audios\/L4_P2_d.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_2D.png", "nombre": "training\/images\/L4_2D.png", "loaded": "empty"}}}, "completo": false},
    "24": {"id": "24", "tipo": {"id": "4", "nombre": "Unica Respuesta", "alias": "tipo4", "descripcion": "Lea y seleccione la respuesta correcta."}, "titulo": "Los alimentos rojos son ricos en antioxidantes que ayudan a prevenir enfermedades cardiovasculares, c\u00e1ncer y a tener buena memoria. Este alimento  NO corresponde:  ", "instruccion": "Lea y seleccione la opcione incorrecta", "texto": null, "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P3.mp3", "nombre": "training\/audios\/L4_P3.mp3", "loaded": "empty"}, "fecha": "2016-07-11 22:54:34", "activo": "1", "padre": "0", "hijo": "0", "opciones": {"94": {"id": "94", "correcta": "0", "orden": "1", "fecha": "2016-07-11 23:23:19", "visible": "1", "texto": "A. Tomate", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P3_a.mp3", "nombre": "training\/audios\/L4_P3_a.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_3A.png", "nombre": "training\/images\/L4_3A.png", "loaded": "empty"}}, "95": {"id": "95", "correcta": "0", "orden": "2", "fecha": "2016-07-11 23:23:19", "visible": "1", "texto": "B. Pimenton", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P3_b.mp3", "nombre": "training\/audios\/L4_P3_b.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_3B.png", "nombre": "training\/images\/L4_3B.png", "loaded": "empty"}}, "96": {"id": "96", "correcta": "0", "orden": "3", "fecha": "2016-07-11 23:23:19", "visible": "1", "texto": "C. Remolacha", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P3_c.mp3", "nombre": "training\/audios\/L4_P3_c.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_3C.png", "nombre": "training\/images\/L4_3C.png", "loaded": "empty"}}, "97": {"id": "97", "correcta": "1", "orden": "4", "fecha": "2016-07-11 23:23:20", "visible": "1", "texto": "D. Dulces en paquetes ", "feedback": "El empaque no es lo importante; los dulces aportan az\u00facares.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P3_d.mp3", "nombre": "training\/audios\/L4_P3_d.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_3D.png", "nombre": "training\/images\/L4_3D.png", "loaded": "empty"}}}, "completo": false},
    "25": {"id": "25", "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."}, "titulo": "Los alimentos violeta contienen antioxidantes para combatir el envejecimiento, prevenir el c\u00e1ncer y enfermedades urinarias. \u00bfQu\u00e9 alimentos cumplen estas condiciones?", "instruccion": "Lea y seleccione las opciones correctas", "texto": null, "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P4.mp3", "nombre": "training\/audios\/L4_P4.mp3", "loaded": "empty"}, "fecha": "2016-07-11 22:54:34", "activo": "1", "padre": "0", "hijo": "0", "opciones": {"98": {"id": "98", "correcta": "1", "orden": "1", "fecha": "2016-07-11 23:23:20", "visible": "1", "texto": "A. Mora", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P4_a.mp3", "nombre": "training\/audios\/L4_P4_a.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_4A.png", "nombre": "training\/images\/L4_4A.png", "loaded": "empty"}}, "99": {"id": "99", "correcta": "0", "orden": "2", "fecha": "2016-07-11 23:23:20", "visible": "1", "texto": "B. Torta de mora", "feedback": "Los colorantes no contienen los nutrientes de los alimentos.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P4_b.mp3", "nombre": "training\/audios\/L4_P4_b.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_4B.png", "nombre": "training\/images\/L4_4B.png", "loaded": "empty"}}, "100": {"id": "100", "correcta": "1", "orden": "3", "fecha": "2016-07-11 23:23:20", "visible": "1", "texto": "C. Cebolla morada", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P4_c.mp3", "nombre": "training\/audios\/L4_P4_c.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_4C.png", "nombre": "training\/images\/L4_4C.png", "loaded": "empty"}}, "101": {"id": "101", "correcta": "1", "orden": "4", "fecha": "2016-07-11 23:23:21", "visible": "1", "texto": "D. Uva morada ", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P4_d.mp3", "nombre": "training\/audios\/L4_P4_d.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_4D.png", "nombre": "training\/images\/L4_4D.png", "loaded": "empty"}}}, "completo": false},
    "26": {"id": "26", "tipo": {"id": "4", "nombre": "Unica Respuesta", "alias": "tipo4", "descripcion": "Lea y seleccione la respuesta correcta."}, "titulo": "Los alimentos blancos ayudan a combatir infecciones y hongos, reducen el colesterol, presi\u00f3n arterial y previenen la diabetes. Son ricos en vitaminas y minerales. Este alimento es blanco pero pertenece a otro grupo de alimentos...", "instruccion": "Lea y seleccione la respuesta incorrecta", "texto": null, "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P5.mp3", "nombre": "training\/audios\/L4_P5.mp3", "loaded": "empty"}, "fecha": "2016-07-11 22:54:34", "activo": "1", "padre": "0", "hijo": "0", "opciones": {"102": {"id": "102", "correcta": "0", "orden": "1", "fecha": "2016-07-11 23:23:21", "visible": "1", "texto": "A. Ajo", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P5_a.mp3", "nombre": "training\/audios\/L4_P5_a.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_5A.png", "nombre": "training\/images\/L4_5A.png", "loaded": "empty"}}, "103": {"id": "103", "correcta": "0", "orden": "2", "fecha": "2016-07-11 23:23:21", "visible": "1", "texto": "B. Cebolla", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P5_b.mp3", "nombre": "training\/audios\/L4_P5_b.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_5B.png", "nombre": "training\/images\/L4_5B.png", "loaded": "empty"}}, "104": {"id": "104", "correcta": "1", "orden": "3", "fecha": "2016-07-11 23:23:21", "visible": "1", "texto": "C. Az\u00facar", "feedback": "El az\u00facar s\u00ed bien es blanca aporta carbohidratos. ", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P5_c.mp3", "nombre": "training\/audios\/L4_P5_c.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_5C.png", "nombre": "training\/images\/L4_5C.png", "loaded": "empty"}}, "105": {"id": "105", "correcta": "0", "orden": "4", "fecha": "2016-07-11 23:23:21", "visible": "1", "texto": "D. Champi\u00f1ones", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P5_d.mp3", "nombre": "training\/audios\/L4_P5_d.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_5D.png", "nombre": "training\/images\/L4_5D.png", "loaded": "empty"}}}, "completo": false},
    "27": {"id": "27", "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."}, "titulo": "\"\u201cUn plato colorido es un plato nutritivo\u201d.\n\nEn nuestra alimentaci\u00f3n diaria, esta frase significa:\"", "instruccion": "Seleccione todas las opciones verdaderas", "texto": null, "imagen": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_6.png", "nombre": "training\/images\/L4_6.png", "loaded": "empty"}, "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P6.mp3", "nombre": "training\/audios\/L4_P6.mp3", "loaded": "empty"}, "fecha": "2016-07-11 22:54:34", "activo": "1", "padre": "0", "hijo": "0", "opciones": {"106": {"id": "106", "correcta": "1", "orden": "1", "fecha": "2016-07-11 23:23:22", "visible": "1", "texto": "A. incluir los alimentos de todos los grupos", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P6_a.mp3", "nombre": "training\/audios\/L4_P6_a.mp3", "loaded": "empty"}}, "107": {"id": "107", "correcta": "1", "orden": "2", "fecha": "2016-07-11 23:23:22", "visible": "1", "texto": "B. combinar los alimentos adecuadamente", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P6_b.mp3", "nombre": "training\/audios\/L4_P6_b.mp3", "loaded": "empty"}}, "108": {"id": "108", "correcta": "0", "orden": "3", "fecha": "2016-07-11 23:23:22", "visible": "1", "texto": "C. ser un pintor en la cocina", "feedback": "Conocer y combinar los alimentos le ayudar\u00e1n a presentar sus comidas atractivamente. ", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P6_c.mp3", "nombre": "training\/audios\/L4_P6_c.mp3", "loaded": "empty"}}, "109": {"id": "109", "correcta": "1", "orden": "4", "fecha": "2016-07-11 23:23:22", "visible": "1", "texto": "D. servir el plato de comida atractivamente", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P6_d.mp3", "nombre": "training\/audios\/L4_P6_d.mp3", "loaded": "empty"}}}, "completo": false},
    "28": {"id": "28", "tipo": {"id": "4", "nombre": "Unica Respuesta", "alias": "tipo4", "descripcion": "Lea y seleccione la respuesta correcta."}, "titulo": "Al combinar cereales (arroz y ma\u00edz) con leguminosas (frijol, lenteja, arveja seca) se obtiene mejor prote\u00edna. Por ejemplo:", "instruccion": "Lea y seleccione las opciones correctas", "texto": null, "imagen": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L4_7.png", "nombre": "training\/images\/L4_7.png", "loaded": "empty"}, "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P7.mp3", "nombre": "training\/audios\/L4_P7.mp3", "loaded": "empty"}, "fecha": "2016-07-11 22:54:35", "activo": "1", "padre": "0", "hijo": "0", "opciones": {"110": {"id": "110", "correcta": "1", "orden": "1", "fecha": "2016-07-11 23:23:22", "visible": "1", "texto": "A. Frijol con arroz", "feedback": "\u00a1Muy bien! Esta es una buena combinaci\u00f3n. ", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P7_a.mp3", "nombre": "training\/audios\/L4_P7_a.mp3", "loaded": "empty"}}, "111": {"id": "111", "correcta": "0", "orden": "2", "fecha": "2016-07-11 23:23:23", "visible": "1", "texto": "B. Lenteja con arroz", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P7_b.mp3", "nombre": "training\/audios\/L4_P7_b.mp3", "loaded": "empty"}}, "112": {"id": "112", "correcta": "0", "orden": "3", "fecha": "2016-07-11 23:23:23", "visible": "1", "texto": "C. Pasta con arveja seca", "feedback": "\u00a1Muy bien! Esta es una buena combinaci\u00f3n. ", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P7_c.mp3", "nombre": "training\/audios\/L4_P7_c.mp3", "loaded": "empty"}}, "113": {"id": "113", "correcta": "0", "orden": "4", "fecha": "2016-07-11 23:23:23", "visible": "1", "texto": "D. Ma\u00edz con arroz ", "feedback": "Recuerde. Estos alimentos son cereales. Se requiere comer cereal + leguminosa.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L4_P7_d.mp3", "nombre": "training\/audios\/L4_P7_d.mp3", "loaded": "empty"}}}, "completo": false},
    "29": {"id": "29", "tipo": {"id": "2", "nombre": "Formar Parejas", "alias": "tipo2", "descripcion": "Relacionar conceptos, im\u00e1genes, palabras agrupando en parejas."}, "titulo": "El agua garantiza nuestra subsistencia y calidad de vida. La necesitamos para\u2026 ", "instruccion": "Lea y forme parejas", "texto": null, "imagen": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L5_1.png", "nombre": "training\/images\/L5_1.png", "loaded": "empty"}, "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P1.mp3", "nombre": "training\/audios\/L5_P1.mp3", "loaded": "empty"}, "fecha": "2016-07-12 14:26:31", "activo": "1", "padre": "0", "hijo": "0", "opciones": {"114": {"id": "114", "correcta": "1", "orden": "1", "fecha": "2016-07-12 15:02:14", "visible": "1", "texto": "A. Hidratarnos", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P1_a.mp3", "nombre": "training\/audios\/L5_P1_a.mp3", "loaded": "empty"}}, "115": {"id": "115", "correcta": "1", "orden": "1", "fecha": "2016-07-12 15:02:14", "visible": "1", "texto": "Beber ocho vasos de agua limpia al dia.", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P1_a2.mp3", "nombre": "training\/audios\/L5_P1_a2.mp3", "loaded": "empty"}}, "116": {"id": "116", "correcta": "1", "orden": "2", "fecha": "2016-07-12 15:02:14", "visible": "1", "texto": "B. Cocinar", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P1_b.mp3", "nombre": "training\/audios\/L5_P1_b.mp3", "loaded": "empty"}}, "117": {"id": "117", "correcta": "1", "orden": "2", "fecha": "2016-07-12 15:02:14", "visible": "1", "texto": "Lavar y preparar los alimentos que vamos a consumir.", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P1_b2.mp3", "nombre": "training\/audios\/L5_P1_b2.mp3", "loaded": "empty"}}, "118": {"id": "118", "correcta": "1", "orden": "3", "fecha": "2016-07-12 15:02:15", "visible": "1", "texto": "C. Ba\u00f1arnos", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P1_c.mp3", "nombre": "training\/audios\/L5_P1_c.mp3", "loaded": "empty"}}, "119": {"id": "119", "correcta": "1", "orden": "3", "fecha": "2016-07-12 15:02:15", "visible": "1", "texto": "Ba\u00f1arse todos los d\u00edas para evitar enfermedades.", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P1_c2.mp3", "nombre": "training\/audios\/L5_P1_c2.mp3", "loaded": "empty"}}, "120": {"id": "120", "correcta": "1", "orden": "4", "fecha": "2016-07-12 15:02:15", "visible": "1", "texto": "D. Regar las plantas", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P1_d.mp3", "nombre": "training\/audios\/L5_P1_d.mp3", "loaded": "empty"}}, "121": {"id": "121", "correcta": "1", "orden": "4", "fecha": "2016-07-12 15:02:15", "visible": "1", "texto": "Echarle agua a las plantas para que crezcan algunos de los alimentos para consumir.", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P1_d2.mp3", "nombre": "training\/audios\/L5_P1_d2.mp3", "loaded": "empty"}}, "122": {"id": "122", "correcta": "1", "orden": "5", "fecha": "2016-07-12 15:02:15", "visible": "1", "texto": "E. Limpiar la casa", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P1_e.mp3", "nombre": "training\/audios\/L5_P1_e.mp3", "loaded": "empty"}}, "123": {"id": "123", "correcta": "1", "orden": "5", "fecha": "2016-07-12 15:02:16", "visible": "1", "texto": "Mantener aseada la casa para evitar enfermedades.", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P1_e2.mp3", "nombre": "training\/audios\/L5_P1_e2.mp3", "loaded": "empty"}}, "124": {"id": "124", "correcta": "1", "orden": "6", "fecha": "2016-07-12 15:02:16", "visible": "1", "texto": "F. Dar de beber a los animales.", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P1_f.mp3", "nombre": "training\/audios\/L5_P1_f.mp3", "loaded": "empty"}}, "125": {"id": "125", "correcta": "1", "orden": "6", "fecha": "2016-07-12 15:02:17", "visible": "1", "texto": "Existen animales que nos sirven de alimento, como la vaca.", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P1_f2.mp3", "nombre": "training\/audios\/L5_P1_f2.mp3", "loaded": "empty"}}}, "completo": false},
    "30": {"id": "30", "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."}, "titulo": "El agua proviene de diferentes fuentes de la naturaleza. La obtenemos:", "instruccion": "Lea y seleccione las opciones correctas.", "texto": null, "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P2.mp3", "nombre": "training\/audios\/L5_P2.mp3", "loaded": "empty"}, "fecha": "2016-07-12 14:28:56", "activo": "1", "padre": "0", "hijo": "0", "opciones": {"126": {"id": "126", "correcta": "0", "orden": "1", "fecha": "2016-07-12 15:02:18", "visible": "1", "texto": "A. del sol", "feedback": "El sol ayuda al ciclo de vida del agua.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P2_a.mp3", "nombre": "training\/audios\/L5_P2_a.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L5_2A.png", "nombre": "training\/images\/L5_2A.png", "loaded": "empty"}}, "127": {"id": "127", "correcta": "1", "orden": "2", "fecha": "2016-07-12 15:02:18", "visible": "1", "texto": "B. de las nubes", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P2_b.mp3", "nombre": "training\/audios\/L5_P2_b.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L5_2B.png", "nombre": "training\/images\/L5_2B.png", "loaded": "empty"}}, "128": {"id": "128", "correcta": "1", "orden": "3", "fecha": "2016-07-12 15:02:19", "visible": "1", "texto": "C. de los nevados, r\u00edos y mares", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P2_c.mp3", "nombre": "training\/audios\/L5_P2_c.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L5_2C.png", "nombre": "training\/images\/L5_2C.png", "loaded": "empty"}}, "129": {"id": "129", "correcta": "1", "orden": "4", "fecha": "2016-07-12 15:02:19", "visible": "1", "texto": "D. de las partes subterr\u00e1neas de la tierra", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P2_d.mp3", "nombre": "training\/audios\/L5_P2_d.mp3", "loaded": "empty"}, "media": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L5_2D.png", "nombre": "training\/images\/L5_2D.png", "loaded": "empty"}}}, "completo": false},
    "31": {"id": "31", "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."}, "titulo": "Con la siguientes acciones contaminamos las aguas", "instruccion": "Seleccione todas las opciones verdaderas", "texto": null, "imagen": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L5_3.png", "nombre": "training\/images\/L5_3.png", "loaded": "empty"}, "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P3.mp3", "nombre": "training\/audios\/L5_P3.mp3", "loaded": "empty"}, "fecha": "2016-07-12 14:30:20", "activo": "1", "padre": "0", "hijo": "0", "opciones": {"130": {"id": "130", "correcta": "1", "orden": "1", "fecha": "2016-07-12 15:02:19", "visible": "1", "texto": "A. Arrojar basura a las fuentes de agua", "feedback": "Recuerde. El agua debe protegerse.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P3_a.mp3", "nombre": "training\/audios\/L5_P3_a.mp3", "loaded": "empty"}}, "131": {"id": "131", "correcta": "0", "orden": "2", "fecha": "2016-07-12 15:02:19", "visible": "1", "texto": "B. Lavar ropas en los lavaderos.", "feedback": "Recuerde. Los lavadores llevan el agua utilizada a tuber\u00edas para ser tratadas.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P3_b.mp3", "nombre": "training\/audios\/L5_P3_b.mp3", "loaded": "empty"}}, "132": {"id": "132", "correcta": "1", "orden": "3", "fecha": "2016-07-12 15:02:19", "visible": "1", "texto": "C. Lavar y desechar bombas de fumigaci\u00f3n en las fuentes de agua.", "feedback": "El mal tratamiento de desechos de las fumigaciones contaminan las fuentes de agua.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P3_c.mp3", "nombre": "training\/audios\/L5_P3_c.mp3", "loaded": "empty"}}, "133": {"id": "133", "correcta": "1", "orden": "4", "fecha": "2016-07-12 15:02:19", "visible": "1", "texto": "D. Defecar en las fuentes de agua. ", "feedback": "Recuerde. El agua se contamina con los desechos humanos que se le arrojan. ", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P3_d.mp3", "nombre": "training\/audios\/L5_P3_d.mp3", "loaded": "empty"}}}, "completo": false},
    "32": {"id": "32", "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."}, "titulo": "Al consumir agua contamina, la persona presenta los siguientes s\u00edntomas:", "instruccion": "Lea y seleccione las opciones correctas.", "texto": null, "imagen": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L5_4.png", "nombre": "training\/images\/L5_4.png", "loaded": "empty"}, "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P4.mp3", "nombre": "training\/audios\/L5_P4.mp3", "loaded": "empty"}, "fecha": "2016-07-12 14:31:31", "activo": "1", "padre": "0", "hijo": "0", "opciones": {"134": {"id": "134", "correcta": "1", "orden": "1", "fecha": "2016-07-12 15:02:20", "visible": "1", "texto": "A. Sufre de dolor de estom\u00e1go.", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P4_a.mp3", "nombre": "training\/audios\/L5_P4_a.mp3", "loaded": "empty"}}, "135": {"id": "135", "correcta": "0", "orden": "2", "fecha": "2016-07-12 15:02:20", "visible": "1", "texto": "B. Suda normalmente", "feedback": "Recuerde. Al infectarse por agua contaminada los virus atacan caus\u00e1ndole escolofrios y sudor. ", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P4_b.mp3", "nombre": "training\/audios\/L5_P4_b.mp3", "loaded": "empty"}}, "136": {"id": "136", "correcta": "1", "orden": "3", "fecha": "2016-07-12 15:02:20", "visible": "1", "texto": "C. Vomita y tiene diarrea.", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P4_c.mp3", "nombre": "training\/audios\/L5_P4_c.mp3", "loaded": "empty"}}, "137": {"id": "137", "correcta": "1", "orden": "4", "fecha": "2016-07-12 15:02:20", "visible": "1", "texto": "D. Sufre de deshidrataci\u00f3n.", "feedback": "\u00a1Muy bien!", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P4_d.mp3", "nombre": "training\/audios\/L5_P4_d.mp3", "loaded": "empty"}}}, "completo": false},
    "33": {"id": "33", "tipo": {"id": "3", "nombre": "Multiple Respuesta", "alias": "tipo3", "descripcion": "Seleccione todas las respuestas correcatas."}, "titulo": "Todos somos responsables del cuidado del agua. Debemos realizarlas las siguientes acciones para protegerla: ", "instruccion": "Lea y seleccione las opciones correctas.", "texto": null, "imagen": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/images\/L5_5.png", "nombre": "training\/images\/L5_5.png", "loaded": "empty"}, "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P5.mp3", "nombre": "training\/audios\/L5_P5.mp3", "loaded": "empty"}, "fecha": "2016-07-12 14:32:16", "activo": "1", "padre": "0", "hijo": "0", "opciones": {"138": {"id": "138", "correcta": "1", "orden": "1", "fecha": "2016-07-12 15:02:20", "visible": "1", "texto": "A. Recoger y purificar el agua lluvia", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P5_a.mp3", "nombre": "training\/audios\/L5_P5_a.mp3", "loaded": "empty"}}, "139": {"id": "139", "correcta": "1", "orden": "2", "fecha": "2016-07-12 15:02:20", "visible": "1", "texto": "B. Limpiar y cuidar los dep\u00f3sitos de agua.", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P5_b.mp3", "nombre": "training\/audios\/L5_P5_b.mp3", "loaded": "empty"}}, "140": {"id": "140", "correcta": "0", "orden": "3", "fecha": "2016-07-12 15:02:21", "visible": "1", "texto": "C. Arrojar desechos a las fuentes de agua", "feedback": "Recuerde. Arrojar desechos contamina el agua puede generar enfermedades.", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P5_c.mp3", "nombre": "training\/audios\/L5_P5_c.mp3", "loaded": "empty"}}, "141": {"id": "141", "correcta": "1", "orden": "4", "fecha": "2016-07-12 15:02:21", "visible": "1", "texto": "D. Hervir el agua por diez minutos antes de consumir.", "feedback": "", "audio": {"url": "https:\/\/s3.amazonaws.com\/nutrifami\/training\/audios\/L5_P5_d.mp3", "nombre": "training\/audios\/L5_P5_d.mp3", "loaded": "empty"}}}, "completo": false}
};