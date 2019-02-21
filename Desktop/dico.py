#!/usr/bin/python3.7

from word import Word

class Dico():

    def __init__(self):
        self.langue = ""
        self.list = []

    def buildDico(self):
        f = open('enDico.txt', 'r')
        lignes = f.readlines()
        f.close()
        i = 0
        for ligne in lignes:
            i = i + 1
            word = Word()
            word.id = i
            word.en = ligne.rstrip()
            word.buildWagou()
            self.list.append(word)
        self.langue = "en"
        json_string = json.dumps([ob.__dict__ for ob in self.list], indent=4)
        f = open("translate.json","w")
        f.write(json_string)
        f.close()
