# python3 /mnt/d/Dropbox\ \(Personal\)/harry/harry.py
# "I:\python\python.exe" "I:\Dropbox (Personal)\harry\harry.py"
from curses import raw
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


sentence_pattern = re.compile(r"""
(?<=[!\.?]) # Look behind assertion because we want to keep the sentence ending
\s+
""", re.VERBOSE | re.DOTALL)

answer_pattern = re.compile(r"""
\_{3,}  # some underlines, at least 3
\s* # some spaces
\( # opening 
([^)]*) #hint in ()
\) # closing
""", re.VERBOSE | re.DOTALL)


import json 

strip_text = raw_text.strip()

sentences = sentence_pattern.split(strip_text)

preguntas = []

current_problema = ""
current_answers = []

for sentence in sentences:
  print(f"Sentence: {sentence}")

  for m in answer_pattern.finditer(sentence):
    print(m)
    current_answers.append({
      "repuesta": "",
      "razón": "",
      "indicio": m.group(1)
    })

  no_hints = answer_pattern.sub("_____", sentence)

  print(f"No hints: {no_hints}")

  current_problema += no_hints + "  "

  if len(current_answers) >= 2:
    preguntas.append({
      "problema": current_problema,
      "repuestas": current_answers
    })
    
    current_problema = ""
    current_answers = []

if len(current_answers) >= 0:
    preguntas.append({
      "problema": current_problema,
      "repuestas": current_answers
    })
    
print(json.dumps(preguntas, indent = 2, ensure_ascii=False))    