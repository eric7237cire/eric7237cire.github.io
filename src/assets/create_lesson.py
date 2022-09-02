# -*- coding: utf-8 -*-
# python3 src/assets/create_lesson.py
import sys
from pathlib import Path
import re

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

raw_text = """
Antes yo no ________ (1. sabía/supe) [sabía] nada sobre Colombia, pero el diciembre pasado _________ (2. viajaba/viajé) [viajé] a Bogotá y __________ (3. aprendía/aprendí) [aprendí] mucho sobre el país. Durante mi visita, ____________ (4. conocía/conocí) [conocí] varios centros comerciales, discotecas, universidades y parques inmensos. También _______ (5. podía/pude) [pude] ver las obras originales de Fernando Botero, el famoso pintor de figuras voluminosas. El último día, un guía turístico me _________ (6. decía/dijo) [dijo] que yo no ________ (7. podía/pude) [podía] irme sin ver el Museo del Oro, e inmediatamente ___________ (8. decidía/decidí) [decidí] visitarlo. Afortunadamente, esa misma tarde __________ (9. podíamos/pudimos) [podíamos o pudimos] ir al museo. Allí _________ (10. había/hubo) [había] impresionantes piezas de oro elaboradas por la cultura Muisca, los indígenas de esa región. También __________ (11. descubríamos/descubrimos) [descubrimos] que los muiscas nunca __________ (12. querían/quisieron) [quisieron] revelar el secreto de El Dorado –la legendaria ciudad de oro– a los españoles, quienes no __________ (13. podían/pudieron) [pudieron] encontrarlo jamás. Paradójicamente, los colombianos ___________ (14. daban/dieron) [dieron] el nombre de "El dorado" al aeropuerto internacional de la capital. Gracias a este viaje, _______ (15. descubría/descubrí) [descubrí] que Bogotá es una ciudad muy moderna con una rica historia.
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



answer_pattern = re.compile(r"""
_+
\s*
\( # opening 
([^)]*) #hint in ()
\) # closing
\s* # some spaces
\[
([^]]*)  # some underlines, at least 3
\]

""", re.VERBOSE | re.DOTALL)

clean_numbers = re.compile(r"""
\d+\.
""", re.VERBOSE | re.DOTALL)

import json 

strip_text = raw_text.strip()

strip_text = clean_numbers.sub("", strip_text)
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
      "indicio": m.group(1).strip()
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
