from flask import Blueprint, request, json, jsonify, abort, make_response

PLANS = []
SINISTROSTYPES = []
TECHNICIANS = []
USUARIOS = []
SINISTROS = []
CHAMADOS = []

urls_blueprint = Blueprint('urls', __name__,)

def carrega_database():
    global PLANS
    global SINISTROS
    global TECHNICIANS
    f = open('/home/lucas/Documentos/ufu/twm/seguradora/backend/src/database.json')
  
    data = json.load(f)
  
    if not PLANS:
        for i in data['plans']:        
            PLANS.append(i)

    if not SINISTROSTYPES:
        for i in data['sinistrosTypes']:        
            SINISTROSTYPES.append(i)

    if not TECHNICIANS:
        for i in data['technicians']:        
            TECHNICIANS.append(i)

    if not USUARIOS:
        for i in data['usuarios']:        
            USUARIOS.append(i)
    
@urls_blueprint.route('/')
def index():
    carrega_database()
    ret = {"Status": "Backend is running"}
    return ret

@urls_blueprint.route('/plans', methods = ['GET'])
def get_all_plans():    
    global PLANS
    try:
        ret = {
            "plans": PLANS
        }

    except Exception as e:
        ret = {
            "plans": []
        }
    return ret

@urls_blueprint.route('/sinistros/types', methods = ['GET'])
def get_all_sinistros_types():    
    global SINISTROSTYPES
    try:
        ret = {
            "sinistrosTypes": SINISTROSTYPES
        }

    except Exception as e:
        ret = {
            "sinistrosTypes": []
        }
    return ret

@urls_blueprint.route('/technician', methods = ['GET'])
def get_all_technician():    
    global TECHNICIANS
    try:
        nome_pesquisa = request.args.get('matricula')
        tamanho_TECHNICIANS = len(TECHNICIANS)
        for i in range(tamanho_TECHNICIANS):
            if (nome_pesquisa in TECHNICIANS[i]['matricula']):
                ret = {
                    "status": "Tecnico encontrado",
                    "technicians": TECHNICIANS[i]
                }
                break
            else:
                ret = {"status": "Tecnico não encontrado",
               "technicians": []}

    except Exception as e:
        ret = {
            "status": "Lista de tecnicos",
            "technicians": TECHNICIANS
        }
    return ret

@urls_blueprint.route('/technician', methods = ['PUT'])
def edit_technician():
    global TECHNICIANS
    req_data = request.get_json()
    nome_pesquisa = request.args.get('matricula')
    tamanho_TECHNICIANS = len(TECHNICIANS)

    technician_json = {
        "matricula": req_data['matricula'], 
        "technicianBy": req_data['technicianBy'], 
        "name": req_data['name'], 
        "email": req_data['email'],
        "phone": req_data['phone'],
        "cpf": req_data['cpf'],
        "nctps": req_data['nctps'],
        "street": req_data['street'],
        "district": req_data['district'],
        "city": req_data['city']
    }

    TECHNICIANS = [technician_json]
    for i in range(tamanho_TECHNICIANS):
        if (nome_pesquisa in TECHNICIANS[i]['apolice']):
            ret = TECHNICIANS[i]
            break
        else:
            ret = {
                "status": "Usuario não encontrado",
            }

    return ret

    

@urls_blueprint.route('/sinistro', methods = ['GET'])
def get_all_sinistro():    
    global SINISTROS
    try:
        ret = {
            "sinistros": SINISTROS
        }

    except Exception as e:
        ret = {
            "sinistros": []
        }
    return ret

@urls_blueprint.route('/sinistro', methods = ['POST'])
def add_sinistro():
    global SINISTROS
    req_data = request.get_json()

    matricula = req_data['matricula']
    apolice = req_data['apolice']
    planType = req_data['planType']
    technician = None
    user = None

    for i in range(len(TECHNICIANS)):
        if (matricula in TECHNICIANS[i]['matricula']):
            technician = TECHNICIANS[i]
            break
    
    if technician is None:
        abort(make_response(jsonify(message='Matricula não encontrada'), 404))

    for i in range(len(USUARIOS)):
        if (apolice in USUARIOS[i]['apolice']):
            user = USUARIOS[i]
            break

    if user is None:
        abort(make_response(jsonify(message='Apolice não encontrada'), 404))
    
    if planType != user['planType']:
        abort(make_response(jsonify(message='Essa apolice não possui esse plano'), 404))

    sinistro_json = {
        "matricula": req_data['matricula'], 
        "apolice": req_data['apolice'], 
        "planType": req_data['planType'], 
        "initHour": req_data['initHour'],
        "endHour": req_data['endHour'],
        "address": req_data['address'],
        "district": req_data['district'],
        "city": req_data['city'],
        "cep": req_data['cep'],
        "resp_locale": req_data['resp_locale'],
        "phone_contact": req_data['phone_contact'],
        "sinistrosTypes": req_data['sinistrosTypes']
    }

    SINISTROS.append(sinistro_json)
    ret = {
        "sinistros": SINISTROS
    }

    return ret

@urls_blueprint.route('/usuario', methods = ['GET'])
def get_usuarios():    
    global USUARIOS
    try:
        nome_pesquisa = request.args.get('apolice')
        tamanho_USUARIOS = len(USUARIOS)
        for i in range(tamanho_USUARIOS):
            if (nome_pesquisa in USUARIOS[i]['apolice']):
                ret = {
                    "status": "Usuario encontrado",
                    "usuarios": USUARIOS[i]
                }
                break
            else:
                ret = {
                    "status": "Usuario não encontrado",
                    "usuarios": []
               }

    except Exception as e:
        ret = {
            "status": "Lista de usuarios",
            "usuarios": USUARIOS
        }
    return ret

@urls_blueprint.route('/usuario', methods = ['PUT'])
def edit_usuario():
    global USUARIOS
    req_data = request.get_json()
    nome_pesquisa = request.args.get('apolice')
    tamanho_USUARIOS = len(USUARIOS)

    usuario_json = {
        "apolice": req_data['apolice'], 
        "planType": req_data['planType'], 
        "name": req_data['name'], 
        "email": req_data['email'],
        "phone": req_data['phone'],
        "cpf": req_data['cpf'],
        "cep": req_data['cep'],
        "street": req_data['street'],
        "district": req_data['district'],
        "city": req_data['city']
    }

    USUARIOS = [usuario_json]
    for i in range(tamanho_USUARIOS):
        if (nome_pesquisa in USUARIOS[i]['apolice']):
            ret = USUARIOS[i]
            break
        else:
            ret = {
                "status": "Usuario não encontrado",
            }

    return ret

@urls_blueprint.route('/chamado', methods = ['GET'])
def get_all_chamado():    
    global CHAMADOS
    try:
        ret = {
            "chamados": CHAMADOS
        }

    except Exception as e:
        ret = {
            "chamados": []
        }
    return ret

@urls_blueprint.route('/chamado', methods = ['POST'])
def add_chamado():
    global CHAMADOS

    req_data = request.get_json()
    
    apolice = req_data['apolice']
    planType = req_data['planType']
    user = None

    for i in range(len(USUARIOS)):
        if (apolice in USUARIOS[i]['apolice']):
            user = USUARIOS[i]
            break

    if user is None:
        abort(make_response(jsonify(message='Apolice não encontrada'), 404))
    
    if planType != user['planType']:
        abort(make_response(jsonify(message='Você não possui esse plano'), 404))

    chamado_json = { 
        "apolice": req_data['apolice'], 
        "planType": req_data['planType'], 
        "date": req_data['date'],
        "cep": req_data['cep'],
        "address": req_data['address'],
        "district": req_data['district'],
        "city": req_data['city'],
        "resp_locale": req_data['resp_locale'],
        "phone_contact": req_data['phone_contact'],
        "sinistrosTypes": req_data['sinistrosTypes']
    }

    CHAMADOS.append(chamado_json)
    ret = {
        "sinistros": CHAMADOS
    }

    return ret