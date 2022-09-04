# -*- coding: utf-8 -*-
# python3 src/assets/create_lesson.py
# "I:\python\python.exe" I:\eric7237cire.github.io\src\assets\create_lesson.py
import sys
from pathlib import Path
import re

raw_text = """
Antes yo no ________ (1. sabía/supe) [sabía] nada sobre Colombia, pero el diciembre pasado _________ (2. viajaba/viajé) [viajé] a Bogotá y __________ (3. aprendía/aprendí) [aprendí] mucho sobre el país. Durante mi visita, ____________ (4. conocía/conocí) [conocí] varios centros comerciales, discotecas, universidades y parques inmensos. También _______ (5. podía/pude) [pude] ver las obras originales de Fernando Botero, el famoso pintor de figuras voluminosas. El último día, un guía turístico me _________ (6. decía/dijo) [dijo] que yo no ________ (7. podía/pude) [podía] irme sin ver el Museo del Oro, e inmediatamente ___________ (8. decidía/decidí) [decidí] visitarlo. Afortunadamente, esa misma tarde __________ (9. podíamos/pudimos) [podíamos o pudimos] ir al museo. Allí _________ (10. había/hubo) [había] impresionantes piezas de oro elaboradas por la cultura Muisca, los indígenas de esa región. También __________ (11. descubríamos/descubrimos) [descubrimos] que los muiscas nunca __________ (12. querían/quisieron) [quisieron] revelar el secreto de El Dorado –la legendaria ciudad de oro– a los españoles, quienes no __________ (13. podían/pudieron) [pudieron] encontrarlo jamás. Paradójicamente, los colombianos ___________ (14. daban/dieron) [dieron] el nombre de "El dorado" al aeropuerto internacional de la capital. Gracias a este viaje, _______ (15. descubría/descubrí) [descubrí] que Bogotá es una ciudad muy moderna con una rica historia.
"""

raw_text = """
Cuando Kal-El ______ (fue, era) [era] joven él _______ (vivió, vivía) [vivía] en el planeta Krypton. Pero un día sus padres se ________ (despidieron, despedían) [despidieron] de él y lo ________ (pusieron, ponían) [pusieron] en una nave espacial para salvarlo de la explosión de Krypton. Después de un viaje largo, él ________ (llegó, llegaba) [llegó] a un pueblo en Kansas donde Johnathan y Martha Kent lo _________ (encontraron, encontraban) [encontraron]. Ellos le ________ (dieron, daban) [dieron] el nombre nuevo de Clark Kent. Clark ______ (quiso, quería) [quería] mucho a sus padres adoptivos y siempre __________ (hizo, hacía) [hacía] muchas tareas para ayudarlos en casa. Clark ______ (tuvo, tenía) [tenía] un perro que se ______ (llamó, llamaba) [llamaba] Krypto y se ________ (divirtieron, divertían) [divertían] juntos cada día. Un día Clark ________ (supo , sabía) [supo] la verdad sobre su doble identidad cuando sus padres le _________ (dijeron, decían) [dijeron] que ________ (fue , era) [era] un Superhombre! Clark _______ (pasó, pasaba) [pasó] 10 años con su familia adoptiva en Kansas y entonces ________ (empezó, empezaba) [empezó] a trabajar como reportero para el Daily Planet.



Los dos amigos nuevos de Clark Kent, Lois Lane y Jimmy Olsen, _________ (estuvieron, estaban) [estaban] preocupados con frecuencia porque generalmente ellos no ______ (vieron, veían) [veían] a Clark Kent en la escena de un crimen o accidente importante. Un día por ejemplo, mientras Clark ______ (escribió, escribía) [escribía] un artículo para el Daily Planet y también __________ (escuchó, escuchaba) [escuchaba] la radio, _________ (oyó, oía) [oyó] algo terrible. ¡Una crisis en el aeropuerto! ¡Su enemigo, Lex Luther, ________ (fue, iba) [iba] a usar un avión con una bomba llena de ántrax y cólera para matar a millones de personas! Al oír esto, Clark Kent _______ (salió, salía) [salió] inmediatamente de su oficina, _________ (entró, entraba) [entró] en una cabina telefónica, y se ______ (puso , ponía) [puso] una capa roja. Entonces Superhombre se _______ (fue, iba) [fue] rápidamente por el cielo y ________ (destruyó, destruía) [destruyó] la bomba con su visión X--- ¡pero Lex Luther se ________ (escapó, escapaba) [escapó] otra vez.

     """

raw_text = """
1. ¿Te  (gustar) __________ [gustaría] cambiar de trabajo o estás contento con el que tenés?
2. Nunca  (yo, perdonar) ________________ [perdonaría] una infidelidad.
3. ¿ (vos, querer)_____________ [querrías] cerrar la ventana, por favor? Hace un poco de frío.
4.  (ustedes, tener)______________ [tendrían] que llegar antes que nosotros.
5. Me dijo que el lunes  (ella, salir) _______________ [saldría] más tarde.
6. Le prometí al médico que no  (fumar) ____________ [fumaría] tanto.
7. Creí que  (haber)_____________ [habría] más gente en la fiesta.
8. No pensaba que el viaje  (valer) _______________ [valdría] tanto la pena.
9. ¡Nos  (comer) ______________ [comeríamos] una paella ahora mismo!
10. Laura y Sergio me dijeron que  (venir) __________ [vendrían] al pueblo este verano.
11. Si te soy sincera  (preferir) ____________ [preferiría] tener el pelo completamente liso.
12. Yo en tu lugar no lo  (hacer) ___________ [haría] así.
13.  (vos, deber)______________ [deberías] ir al médico lo antes posible.
14. No sé qué te parece pero  (poder)___________ [podríamos] irnos de vacaciones en mayo.
15. Cuando apareció,  (ser)____________ [serían] las tres de la mañana.
16. ¿Les  (gustar) ___________ [gustaría] ir a la playa el domingo?
17. A Laura y Alberto les  (encantar)___________ [encantaría] vivir en un pueblo de montaña.
18. De esa manera  (nosotros, ahorrar) ___________ [ahorraríamos] más dinero.
19. Yo que ustedes  (apagar) _________ [apagaría] el celular.
20. ¡Me dijeron que no  (ustedes, decir)__________ [dirían] nada!
21. Tu marido y tú os  (sentir) ___________ [sentiríais]como en casa.
22. ¿ (usted, saber) ___________ [sabría] cómo llegar al centro de la ciudad?
23. Siempre dijimos que (nosotras, aprender)_________ [aprenderíamos] juntas.
"""     

sentence_pattern = re.compile(r"""
(?<=[!\.?]) # Look behind assertion because we want to keep the sentence ending
\s+
""", re.VERBOSE | re.DOTALL)

# sentence_pattern = re.compile(r"""
# \n
# """, re.VERBOSE | re.DOTALL)

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
\( # opening 
([^)]*) #hint in ()
\) # closing
\s* # some spaces
_+
\s*
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
      "repuesta": m.group(2).strip(),
      "razón": "",
      "indicio": m.group(1).strip()
    })

  no_hints = sentence
  #no_hints = strip_pattern.sub("", no_hints)
  #no_hints = hint_pattern.sub("", no_hints)
  no_hints = answer_pattern.sub("_____", no_hints)

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
