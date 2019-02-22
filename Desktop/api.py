import requests
import json

app_id = '1341df9f'
app_key = 'e212e7688071ccd32d2cbf7ef734accc'

source_language = 'en'
target_language = 'de'
word_id = 'rabbit'

url = 'https://od-api.oxforddictionaries.com/api/v1/entries/' + source_language + '/' + word_id.lower() + '/translations='+ target_language

r = requests.get(url, headers={'app_id': app_id, 'app_key': app_key})

print("code{}\n".format(r.status_code))
print("text\n" + r.text)
print(json.dumps(r.json()))
