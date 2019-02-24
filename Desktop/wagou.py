#!/usr/bin/python3.7

import json
from tkinter import *

class Wagou(Frame):

    def __init__(self, fenetre):
        Frame.__init__(self,fenetre)
        self.pack(fill=BOTH)

        self.sourceLabel = Label(self, text="English")
        self.sourceLabel.grid(row=1, column=1)
        self.source = Entry(self)
        self.source.grid(row=1, column=2)

        self.buttonTranslate = Button(self, text="Translate", command=self.translate)
        self.buttonTranslate.grid(row=2, column=2)

        self.buttonReset = Button(self, text="Reset", command=self.reset)
        self.buttonReset.grid(row=3, column=2)

        self.targetLabel = Label(self, text="Wagou")
        self.targetLabel.grid(row=4, column=1)
        self.target = Entry(self)
        self.target.grid(row=4, column=2)

    def translate(self):
        found = False
        if not self.target.get() or (self.target.get() and self.source.get()):
            word = self.source.get()
            lang = "en"
        if not self.source.get():
            word = self.target.get()
            lang = "wg"
        f = open("../translate.json","r")
        data = json.load(f)
        f.close()
        for ob in data:
            if ob["en"]==word and lang=="en":
                found = True
                self.target.delete(0, END)
                self.target.insert(0, ob["wg"])
            if ob["wg"]==word and lang=="wg":
                found = True
                self.source.delete(0, END)
                self.source.insert(0, ob["en"])
                print(ob["en"])
        if not found:
            print("Mot inexistant")

    def reset(self):
        self.target.delete(0, END)
        self.source.delete(0, END)

fenetre = Tk()
wagou = Wagou(fenetre)
wagou.mainloop()
