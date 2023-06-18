def base_line(order):
    '''
    Получаем order -- json запрос с перечнем товаров
    ищем минимально возможную упаковку из словаря boxes для всех товаров
    Возвращаем {"orderid": "sdfsdf", "package": "ADC", "status": "ok"}
    !!! нет проверок на типы
    !!! если есть товар который не влезет выдаст None, проверки по остальным не сделает
    '''

    def multiply_min(lst, number):
        min_val = min(lst)
        min_index = lst.index(min_val)
        lst[min_index] *= number
        return lst

    orderId = order['orderId']
    bricks = [] # размеры товаров в список
    vol_range = {} # объемы для последующего отсева наиболее объемных
    for i in order['items']:
        #sizes = (float(i['size1']), float(i['size2']), float(i['size3'])) * i['count']
        sizes = (float(i['size1']), float(i['size2']), float(i['size3']))  # * i['count']
        sizes = multiply_min(list(sizes), i['count'])
        vol_range[i['sku']] = float(i['size1']) * float(i['size2']) * float(i['size3'])
        bricks.append(sizes)
        # for j in range(i['count']):
        #
    # размеры коробок
    boxes = {
        'KSD': {'x': 0.0, 'y': 0.0, 'z': 0.0},
        'STRETCH': {'x': 0.0, 'y': 0.0, 'z': 0.0},
        'NONPACK': {'x': 0.0, 'y': 0.0, 'z': 0.0},
        'MYA': {'x': 15.0, 'y': 20.0, 'z': 3.33},
        'MYF': {'x': 20.0, 'y': 15.0, 'z': 5.0},
        'YMU': {'x': 27.0, 'y': 24.0, 'z': 4.0},
        'MYB': {'x': 22.0, 'y': 32.0, 'z': 4.9},
        'YMA': {'x': 24.7, 'y': 15.0, 'z': 10.0},
        'YMV': {'x': 37.0, 'y': 29.0, 'z': 4.0},
        'MYC': {'x': 30.0, 'y': 38.0, 'z': 7.4},
        'YMC': {'x': 30.0, 'y': 20.0, 'z': 15.0},
        'YMF': {'x': 35.0, 'y': 25.0, 'z': 15.0},
        'MYD': {'x': 38.0, 'y': 50.0, 'z': 8.2},
        'YMW': {'x': 40.0, 'y': 30.0, 'z': 15.0},
        'MYE': {'x': 43.0, 'y': 63.0, 'z': 9.7},
        'YMG': {'x': 44.7, 'y': 30.0, 'z': 20.0},
        'YME': {'x': 30.0, 'y': 30.0, 'z': 44.5},
        'YMP': {'x': 70.0, 'y': 30.0, 'z': 22.0},
        'YMХ': {'x': 40.0, 'y': 18.0, 'z': 65.0},
        # 'YMX': {'x': 40.0, 'y': 18.0, 'z': 65.0}, # дубль
        'YMO': {'x': 65.0, 'y': 45.0, 'z': 20.0},
        'YMJ': {'x': 50.0, 'y': 29.0, 'z': 48.0},
        'YMH': {'x': 42.0, 'y': 20.0, 'z': 86.0},
        'YMY': {'x': 52.0, 'y': 20.0, 'z': 70.0},
        'YML': {'x': 60.0, 'y': 40.0, 'z': 45.0},
        'YMN': {'x': 60.0, 'y': 60.0, 'z': 40.0},
        'YMQ': {'x': 70.0, 'y': 60.0, 'z': 40.0},
        'YMS': {'x': 89.5, 'y': 59.5, 'z': 49.5},
        'YMR': {'x': 80.0, 'y': 60.0, 'z': 80.0}
    }

    def is_fitting(box, bricks):
        for brick in bricks:
            if box['x'] < brick[0] or box['y'] < brick[1] or box['z'] < brick[2]:
                return False
            box = {
                'x': max(box['x'] - brick[0], 0),
                'y': max(box['y'] - brick[1], 0),
                'z': max(box['z'] - brick[2], 0)
            }
        return True

    def find_box(bricks, boxes):
        min_box = None
        min_vol = float('inf')
        for box_name, box in boxes.items():
            if is_fitting(box, bricks):
                vol = box['x'] * box['y'] * box['z']
                if vol < min_vol:
                    min_box = box_name
                    min_vol = vol
        return min_box

    def answer(orderId=orderId, min_box_name='None', status='ok'):
        answer = {}
        answer['orderid'] = orderId
        answer['package'] = min_box_name
        answer['status'] = 'ok'
        return answer

    if find_box(bricks, boxes) != 'None':
        return answer(min_box_name=find_box(bricks, boxes))
    else:
        return answer(min_box_name='STRETCH')

    #
    # while
    #     vol_range.pop(max(vol_range))

    # return min_box_name


order = {"orderId": "af49bf330e2cf16e44f0be1bdfe337bd",
 "items": [
    {"sku": "unique_sku_1", "count": 2,
     "size1": "12", "size2": "6", "size3": "3",
     "weight": "7.34", "type": ["2"]},
    {"sku": "unique_sku_2", "count": 3,
     "size1": "4", "size2": "5.23", "size3": "6.2",
     "weight": "7.45", "type": ["8", "9", "10"]},
    {"sku": "unique_sku_3", "count": 2,
     "size1": "11", "size2": "12.5", "size3": "13.3",
     "weight": "14.2", "type": ["15", "16"]}
   ]
}

print(base_line(order))
