# -*- coding: utf-8 -*-
# python3 src/assets/create_lesson.py
import sys
from pathlib import Path
import re

raw_text = """
Habia una vez un espantapájaros que no ______ (TENER) amigos. Trabajaba en un campo de trigo. No ____ (SER) un trabajo difícil, pero sí, muy solitario.
Sin nadie con quien hablar, sus días y sus noches se hacían eternas. Lo único que podía hacer era mirar los pájaros.
Cada vez que _______ (PASAR),  él los saludaba. Pero ellos nunca respondían.
Un día el espantapájaros _____ (HACER) algo que ____ (ESTAR) prohibido.
Les ofreció unas semillas. Pero aun así, ellos no ______ (QUERER) saber nada.
El espantapájaros se preguntaba por qué nadie quería ser su amigo. Así pasó el tiempo hasta que una noche fría _____ (CAER) a sus pies un cuervo ciego.
El cuervo estaba tiritando y hambriento; el espantapájaros _____ (DECIDIR) cuidar de él.
Tras varios días el cuervo ciego mejoró.
Antes de despedirse, el espantapájaros le preguntó por qué los pájaros nunca ______ (QUERER) hacerse amigos de los espantapájaros y el cuervo explicó que el trabajo de los espantapájaros era asustar a los pobres pájaros que sólo querían comer; ____ (SER) unos seres malvados y despreciables.
Unos monstruos. Ofendido, el espantapájaros le explicó que él no era malo a pesar de ser un espantapájaros.
Una vez más, el espantapájaros _____ (QUEDARSE) sin amigos. Esa misma noche decidió cambiar su vida. Despertó a su amo y le dijo que quería otro oficio, que ya no _____ (QUERER) asustar más a los pájaros.
Aterrorizado, el amo despertó a todos los vecinos.
Les contó que su espantapájaros _______ (COBRAR) vida y que esto sólo podía ser obra del diablo. Cerca del molino estaba el cuervo ciego.
Sus compañeros le explicaron que los vecinos de la aldea _____ (ESTAR) quemando un molino donde se intentaba esconder un espantapájaros con una bufanda muy larga.
El cuervo ciego entonces les explicó que ése ____ (SER) el espantapájaros bueno, el que le ______ (SALVAR) la vida. Conmocionados por la historia, los cuervos _____ (QUERER) salvar al espantapájaros.
Pero era demasiado tarde, y ya no podían hacer nada. El espantapájaros _____ (MORIR) quemado.
Los cuervos esperaron hasta el amanecer y cuando no había llamas, se acercaron a los restos del molino, recogieron las cenizas del espantapájaros, y _____ (VOLAR) alto, muy alto.
Y desde lo más alto, esparcieron las cenizas por el aire. El viento llevó las cenizas por toda la comarca.
Las cenizas volaron junto con todos los pájaros y de esta manera el espantapájaros nunca volvió a estar solo, porque sus cenizas, ahora, volaban con sus nuevos amigos.
Y en recuerdo de la trágica muerte del espantapájaros, el cuervo ciego y todos sus compañeros ______ (DECIDIR) vestir de luto.  Y por eso, desde entonces, en memoria del espantapájaros, todos los cuervos son negros.
"""

raw_text = """
Esta civilización nació a lo largo del río Nilo. El Nilo (ser) _____ su fuente de vida.
Sus crecidas (fertilizar) _____ las tierras de cultivo de sus riberas; también (pescar, ellos) _____ , (cazar) _____ aves en las marismas y (utilizar) ______ el Nilo como vía principal de comunicación y de transporte.
     Estaban gobernados por emperadores, que (descender) ______ de los dioses, y a los que (llamar, ellos) ______ “faraones”. Para enterrar a estos faraones construyeron grandes monumentos funerarios: las pirámides.
     Su religión (ser) ______ politeísta. (Tener, ellos) ______  un dios principal, Amon-Ra, el dios del sol. (Creer, ellos) ______ en la vida después de la muerte, por eso (preparar) ______ a los muertos para esa vida, los (momificar) ______
     (Haber) ______ varias clases sociales. La clase sacerdotal (ser) ______ muy numerosa y (tener) ______ gran influencia social, económica, política e intelectual. Sus miembros (ser) ______ responsables de los templos, pero también (realizar) ______ otras actividades: (ser) ______ médicos que (curar) ______ a los enfermos y magos que (interpretar) ______ los sueños.
     Solo unos pocos (tener) ______ acceso a la escritura: los escribas. Estos (escribir) ______ con signos sagrados: los jeroglíficos. Para los egipcios la escritura (ser) ______ muy importante, un regalo de los dioses. (Querer) ______ dejar constancia de todos los acontecimientos importantes; por eso el faraón y otros personajes iban acompañados siempre de un escriba que lo (anotar) ______ todo.
     Los egipcios (preocuparse) ______ mucho por la higiene y por la estética. En las excavaciones se han encontrado muchísimos tarros con ungüentos y perfumes. Por ejemplo cremas hidratantes y cremas antiarrugas que (fabricar, ellos) ______  con incienso, cera y aceite. Además ya (usar, ellos) ______ pelucas y tintes de pelo. También (depilarse) ______ con cera caliente. ¡Como ahora! Las mujeres (maquillarse) ______ con una mezcla de óxido de hierro con aceite vegetal y resina, (pintarse) ______ los labios con un pequeño pincel y (realzar) ______ la belleza de sus ojos perfilándolos en color negro y morado. Como desodorantes (usar) ______ bolsitas de incienso que (colgar) ______ en las axilas. Y también (pintarse) ______ las uñas.
     (Ser, ellos) ______ bastante presumidos, ¿no?
     """

raw_text = """
Mi abuela
En 1915 mi abuela (nacer)
nació
 en un pequeño pueblo al norte de Buenos Aires. Aunque sus padres (ser)
eran
 italianos, mi abuela no (hablar)
hablaba
 italiano, porque en la escuela sólo (aprender)
aprendió
 el castellano o español. (Ser)
Era
 una niña muy inteligente que (soñar)
soñaba
 con estudiar medicina. Pero sus padres (morir)
murieron
 cuando ella (tener)
tenía
 15 años. Como (ser)
era
 la hermana mayor de tres hermanos (tener)
tenía
 que trabajar mucho para poder alimentarlos. Mi abuela (casarse)
se casó
 cuando (tener)
tenía
 17 años. En aquella época (ser)
era
 normal casarse tan joven, pero ella no (querer)
quería
 casarse tan joven porque (pensar)
pensaba
 ir a Buenos Aires para estudiar en la Universidad, pero no (tener)
tenía
 dinero. (Empezar)
Empezó
 a trabajar en una fábrica de conservas. La fábrica (pertenecer)
pertenecía
 a la familia más rica del pueblo. Allí (conocer)
conoció
 a mi abuelo. Mi abuelo también (trabajar)
trabajaba
 en la fábrica. El (ser)
era
 un hombre muy fuerte, grande y también (ser)
era
 muy simpático. Ellos (enamorarse)
se enamoraron
 a primera vista y (decidir)
decidieron
 casarse muy pronto aunque no (tener)
tenían
 mucho dinero. En 1943 (nacer)
nació
 su primer hijo, mi tío Miguel. Dos años más tarde (nacer)
nació
 mi madre Isabel. Por los niños mi abuela ya no (poder)
pudo
 trabajar más en la fábrica. Por eso, (empezar)
empezó
 a hacer conservas en casa para venderlas, como a la gente del pueblo le (gustar)
gustaban
 mucho las conservas de mi abuela, ella (vender)
vendía
 muchas conservas cada día y (ganar)
ganaba
 más dinero que en la fábrica. Por eso, mi abuelo (dejar)
dejó
 la fábrica también y (empezar)
empezó
 a ayudar a mi abuela con la pequeña tienda que años más tarde (convertirse)
se convirtió
 en la fábrica más grande de la región. Ahora mis abuelos son muy ricos y están jubilados, pero mi abuela todavía hace conservas muy buenas.
"""

raw_text = r"""
No hay receta __para (finalidad)___ encontrar la felicidad
El libro La Insoportable Levedad del Ser fue escrito __por (autor)__ Milan Kundera
Fui al supermercado _para (finalidad)______ comprar papel higiénico. Pero __por (causa)____ culpa de la desesperación de la gente, no había más.
__Por (tiempo)_Para (fecha limité)______ mañana necesito terminar este trabajo.
Vendí mi casa _por (intercambio)_____ USD 90.000.
Para llegar al bosque, tenés que caminar _por (lugar)_____ el sendero más angosto y luego _por (lugar)_____ el sendero más ancho.
_Para (finalidad)_____ detener el Coronavirus tenemos que quedarnos en nuestras casas.
Igualmente, la cuarentena no se puede sostener __por (tiempo)__ mucho tiempo.
Él trabaja con datos suministrados __por (como autor? Medio de comunicación)____ el Ministerio de Salud.
Convierte la información en instrumentos _para (finalidad)______ comprender el virus.
Y es _por (causa)___ esa razón que ahora entendemos mejor al virus.
Las naciones europeas y nórdicas pueden servir de ejemplo _para (finalidad)_____ saber qué es lo que hay o no hay que hacer.
Todas las personas que mueren __por (medio)___ una infección respiratoria deben ser testeadas _para (finalidad)____ ver la causa real de la infección.
Hay que actuar rápido _para (finalidad)____ poner fin a este virus.
Un dato clave _para (finalidad)_____ comprender la propagación es prestar atención a la tasa de variación.
_Para (finalidad)_____ terminar con la epidemia la tasa de reproducción tiene que estar _por (medio? Distribución)___ debajo de 1.
La gente prefiere no salir de su casa _para (dirección)____ ir al supermercado.
En Alemania, las personas pueden reunirse con una persona _por (tiempo)___ día.
"""

raw_text = r"""
Rosa viene a Buenos Aires en verano_para (finalidad)______ ver a sus abuelos.
¿Cuántas veces_por (tiempo)______ semana vas al gimnasio?
Compré una tarta_para (finalidad)______ Carmen.
Quiero ir a Sierra Nevada_para (finalidad)______ esquiar.
Miguel compró una torta_para (finalidad)______ su sobrino.
Necesito mis ahorros_para (finalidad)______ comprar un auto nuevo.
__Por (tiempo)_____ la noche estudio mejor; estoy más tranquilo.
Tenemos clase_por (tiempo)______ la tarde.
¿Cuánto pagaste_para (finalidad?)______ este cuadro?
Tengo hambre, me doy cuenta por (medio)__ el ruido que hace mi panza.
"""

raw_text = r"""
01.- Cuando llegué al aeropuerto l avión ya  ______________ . (salir) [HABÍA SALIDO]
02.- Mi hermano aún no   _______________ (llegar) [HABÍA LLEGADO] cuando comenzó la fiesta.
03.- Ellos nos  _________________ (dar) [HABÍAN DADO] mucha fruta para que la lleváramos al picnic.
05.- Nosotros no_____________________  (hablar) [HABÍAMOS HABLADO] con él antes de leer su historia.
06.- Yo nunca ____________________  un auto. (manejar) [HABÍA MANEJADO]
08.- Cuando llegúe a casa, tú aún no te____________________   (levantar) [HABÍAS LEVANTADO].
10.- Susana me lo ____________________ (pedir) [HABÍA PEDIDO] antes a mí.
01.- Ellos aún no__________   el libro. (abrir) [HABÍAN ABIERTO]
02.- Yo ya_________   mi cama. (hacer) [HABÍA HECHO]
03.- Los turistas aún no___________  . (volver) [HABÍAN VUELTO]
05.-Alguien nos _________  la fecha. (decir) [HABÍA DICHO]
06.- El jugador__________   una pierna. (romperse) [SE HABÍA ROTO]
07.- ¿Quién ____________  la señal allí? (poner) [HABÍA PUESTO]
08.- La nieve  ________ el campo. (cubrir) [HABÍA CUBIERTO]
09.- ¿ ___________ vos esa carta? (escribir) [HABÍAS ESCRITO]
1. Yo ya  _______(barrer) la cocina. [HABÍA BARRIDO]
2. Los chicos ya  ___________(pasar) la aspiradora a la alfombra. [HABÍAN PASADO]
3. Roberto ya _________ (hacer) la comida. [HABÍA HECHO]
4. Elsa y yo ya ________ (planchar) la ropa. [HABÍAN PLANCHADO]
5. Vos ya  ________(limpiar) la heladera. [HABÍAS LIMPIADO]
6. Carmen y Elena ya ___________ (bañar) al perro. [HABÍAS BAÑADO]
7. Anita ya le__________  (poner) la mesa. [HABÍA PUESTO]
8. Raúl y Carlos ya ____________ (comprar) la comida. [HABÍA COMPRADO]
"""

sentence_pattern = re.compile(r"""
(?<=[!\.?]) # Look behind assertion because we want to keep the sentence ending
\s+
""", re.VERBOSE | re.DOTALL)

sentence_pattern = re.compile(r"""
\n
""", re.VERBOSE | re.DOTALL)

strip_pattern = re.compile(r"""
\d+
\.
-?
""", re.VERBOSE | re.DOTALL)

answer_pattern = re.compile(r"""
\[(.*)\]
""", re.VERBOSE | re.DOTALL)

hint_pattern = re.compile(r"""
\(
(.*)
\)
""", re.VERBOSE | re.DOTALL)


def old_code():
  # hint after __
  answer_pattern = re.compile(r"""
  \_{3,}  # some underlines, at least 3
  \s* # some spaces
  \( # opening
  ([^)]*) #hint in ()
  \) # closing
  """, re.VERBOSE | re.DOTALL)

  # hint before
  answer_pattern = re.compile(r"""
  \( # opening
  ([^)]*) #hint in ()
  \) # closing
  \s* # some spaces
  \_{3,}  # some underlines, at least 3

  """, re.VERBOSE | re.DOTALL)

  # hint before  with answer
  answer_pattern = re.compile(r"""
  \( # opening
  ([^)]*) #hint in ()
  \) # closing
  \s* # some spaces
  \n
  ([^\n]*)  # some underlines, at least 3
  \n

  """, re.VERBOSE | re.DOTALL)

  answer_pattern = re.compile(r"""
  _+ # some underlines
  ([^(]*) # answer
  \( # opening
  ([^)]*) #reason in ()
  \) # closing
  _+
  """, re.VERBOSE | re.DOTALL)

import json

strip_text = raw_text.strip()

#strip_text = strip_text.replace("\n", " ")

sentences = sentence_pattern.split(strip_text)

preguntas = []

current_problema = ""
current_answers = []

for sentence in sentences:
  print(f"Sentence: {sentence}")

  hm = hint_pattern.search(sentence)
  for m in answer_pattern.finditer(sentence):
    print(m)
    current_answers.append({
      "repuesta": m.group(1).strip(),
      "razón": "",
      "indicio": hm.group(1)
    })

  no_hints = sentence
  no_hints = strip_pattern.sub("", no_hints)
  no_hints = hint_pattern.sub("", no_hints)
  no_hints = answer_pattern.sub("", no_hints)

  print(f"No hints: {no_hints}")

  current_problema += no_hints.strip() #+ "  "

  if len(current_answers) >= 1:
    preguntas.append({
      "problema": current_problema.replace("\n", " "),
      "repuestas": current_answers
    })

    current_problema = ""
    current_answers = []

if len(current_answers) >= 0:
    preguntas.append({
      "problema": current_problema,
      "repuestas": current_answers
    })

sys.stdout.buffer.write(json.dumps(preguntas, indent = 2, ensure_ascii=False).encode("utf8"))
